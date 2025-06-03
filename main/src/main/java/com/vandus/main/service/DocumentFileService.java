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

@Service
@RequiredArgsConstructor
@Slf4j // Create a logger "log" for this class
public class DocumentFileService {

    private final DocumentFileRepository documentFileRepository;
    private final UserRepository userRepository;

    @Value("${vandus.fileupload.directory}")
    private String fileUploadDirectory;

    private File createFile(MultipartFile file) throws IOException {
        File directory = new File(fileUploadDirectory);
        if (!directory.exists()) directory.mkdirs();

        String originalName = file.getOriginalFilename();
        String uniqueName = randomUUID().toString() + "_" + originalName;
        File destination = new File(directory, uniqueName);

        file.transferTo(destination);
        return destination;
    }
    
    public DocumentFile uploadFile(MultipartFile multipartFile, User owner) {
        File file;
        try {
            file = createFile(multipartFile);
        } catch (IOException e) {
            throw new UnableToUploadFileException("Failed to upload file", e);
        }
    
        DocumentFile document = DocumentFile.builder()
                .name(multipartFile.getOriginalFilename())
                .path(file.getAbsolutePath())
                .owner(owner)
                .build();
        
        DocumentFile savedDocument = documentFileRepository.save(document);
        
        owner.addDocument(savedDocument);
        userRepository.save(owner);
        
        return savedDocument;
    }
    
    public List<DocumentFile> getUserDocuments(User user) {
        return documentFileRepository.findByOwner(user);
    }
    
    public DocumentFile getDocumentById(String id) {
        DocumentFile document = documentFileRepository.findById(id)
            .orElseThrow(() -> new DocumentNotFoundException("Document not found with id: " + id));
        return document;
    }
    
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
    
    public void deleteDocument(String id) {
        DocumentFile document = getDocumentById(id);
        
        try {
            Path filePath = Paths.get(document.getPath());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            log.error("Error deleting file: {}", e.getMessage());
        }

        User owner = document.getOwner();
        owner.getDocuments().removeIf(d -> d.getId().equals(id));
        userRepository.save(owner);
        
        documentFileRepository.delete(document);
    }
}
