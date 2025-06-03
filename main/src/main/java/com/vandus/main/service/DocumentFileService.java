package com.vandus.main.service;

import com.vandus.main.model.DocumentFile;
import com.vandus.main.model.User;
import com.vandus.main.repository.DocumentFileRepository;
import com.vandus.main.repository.UserRepository;
import com.vandus.main.util.exception.DocumentNotFoundException;
import com.vandus.main.util.exception.UnableToUploadFileException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.IOException;
import java.net.MalformedURLException;

import static java.util.UUID.randomUUID;
import java.util.List;

/**
 * Service for handling document file operations including upload, download, and management.
 * Provides functionality for storing files on disk and maintaining their metadata in MongoDB.
 */
@Service
@RequiredArgsConstructor
@Slf4j // Create a logger "log" for this class
public class DocumentFileService {

    private final DocumentFileRepository documentFileRepository;
    private final UserRepository userRepository;

    @Value("${vandus.fileupload.directory}")
    private String fileUploadDirectory;

    /**
     * Creates a new file in the file upload directory with a unique name.
     * 
     * @param file The MultipartFile to create on disk
     * @return File object representing the newly created file on disk
     * @throws IOException If there is an error transferring the file to disk
     */
    private File createFile(MultipartFile file) throws IOException {
        File directory = new File(fileUploadDirectory);
        if (!directory.exists()) directory.mkdirs();

        String originalName = file.getOriginalFilename();
        String uniqueName = randomUUID().toString() + "_" + originalName;
        File destination = new File(directory, uniqueName);

        file.transferTo(destination);
        return destination;
    }

    /**
     * Creates a new DocumentFile object and saves it to the database.
     * Updates the owner's list of documents if the owner is not null.
     * 
     * @param name The name of the document
     * @param path The file system path where the document is stored
     * @param owner The user who owns this document, or null for anonymous uploads
     * @return The saved DocumentFile entity with its ID populated
     */
    private DocumentFile createDocument(String name, String path, User owner) {
        DocumentFile document = DocumentFile.builder()
                .name(name)
                .path(path)
                .owner(owner)
                .build();

        // Calculate expiry date based on document ownership
        document.calculateExpiryDate();
                
        DocumentFile savedDocument = documentFileRepository.save(document);
        
        if (owner != null) {
            owner.addDocument(savedDocument);
            userRepository.save(owner);
        }
        
        return savedDocument;
    }
    
    /**
     * Uploads a file to the file upload directory.
     * Saves the document to the database.
     * Updates the user's list of documents.
     * Sets appropriate expiry date based on document ownership.
     * 
     * @param multipartFile The file to upload
     * @param owner The user who owns this document, or null for anonymous uploads
     * @return The created DocumentFile entity with metadata
     * @throws UnableToUploadFileException If there is an error uploading the file
     */
    public DocumentFile uploadFile(MultipartFile multipartFile, User owner) {
        File file;
        try {
            file = createFile(multipartFile);
        } catch (IOException e) {
            throw new UnableToUploadFileException("Failed to upload file", e);
        }
    
        String name = multipartFile.getOriginalFilename();
        String path = file.getAbsolutePath();
        
        DocumentFile document = createDocument(name, path, owner);
        
        return document;
    }

    /**
     * Uploads a file to the file upload directory without an associated owner.
     * Anonymous uploads have shorter expiry periods.
     * 
     * @param file The file to upload
     * @return The created DocumentFile entity with metadata
     * @throws UnableToUploadFileException If there is an error uploading the file
     */
    public DocumentFile uploadFile(MultipartFile file) {
        return uploadFile(file, null);
    }
    
    /**
     * Retrieves all documents owned by a specific user.
     * 
     * @param user The user whose documents should be retrieved
     * @return List of DocumentFile entities owned by the specified user
     */
    public List<DocumentFile> getUserDocuments(User user) {
        return documentFileRepository.findByOwner(user);
    }
    
    /**
     * Retrieves a document by its ID.
     * 
     * @param id The ID of the document to retrieve
     * @return The DocumentFile entity with the specified ID
     * @throws DocumentNotFoundException If no document with the specified ID exists
     */
    public DocumentFile getDocumentById(String id) {
        DocumentFile document = documentFileRepository.findById(id)
            .orElseThrow(() -> new DocumentNotFoundException("Document not found with id: " + id));
        return document;
    }
    
    /**
     * Downloads a document file by its ID.
     * 
     * @param id The ID of the document to download
     * @return Resource representing the document file
     * @throws DocumentNotFoundException If the document doesn't exist or the file isn't found on disk
     */
    public Resource downloadFile(String id) {
        DocumentFile document = getDocumentById(id);
        
        try {
            Path filePath = Paths.get(document.getPath());
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists()) {
                return resource;
            } else {
                throw new DocumentNotFoundException("File not found on disk: " + document.getPath());
            }
        } catch (MalformedURLException e) {
            throw new DocumentNotFoundException("File not found", e);
        }
    }
    
    /**
     * Deletes a document by its ID, removing it from the database and disk.
     * Also removes the document from its owner's list of documents if applicable.
     * 
     * @param id The ID of the document to delete
     * @throws DocumentNotFoundException If no document with the specified ID exists
     */
    public void deleteDocument(String id) {
        DocumentFile document = getDocumentById(id);
        
        try {
            Path filePath = Paths.get(document.getPath());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            log.error("Error deleting file: {}", e.getMessage());
        }

        User owner = document.getOwner();
        if (owner != null) {
            owner.getDocuments().removeIf(d -> d.getId().equals(id));
            userRepository.save(owner);
        }
        
        documentFileRepository.delete(document);
    }
}
