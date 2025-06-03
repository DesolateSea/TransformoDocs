package com.vandus.main.controller;

import com.vandus.main.dto.MessageResponse;
import com.vandus.main.model.User;
import com.vandus.main.model.DocumentFile;
import com.vandus.main.service.UserService;
import com.vandus.main.service.DocumentFileService;
import com.vandus.main.util.exception.InvalidFileException;

import lombok.RequiredArgsConstructor;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

import com.vandus.main.dto.DocumentResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("${vandus.api.private}/document")
@Tag(
    name="Document API",
    description="API for managing documents (upload, download, listing, deletion)"
)
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentFileService documentFileService; 
    private final UserService userService;
    
    @PostMapping
    @Operation(
        summary="Upload a document",
        description="Upload a document file to the server"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Document uploaded successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid file or file is empty"),
        @ApiResponse(responseCode = "500", description = "Failed to upload file")
    })
    public ResponseEntity<DocumentResponse> uploadDocument(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            throw new InvalidFileException("File is empty");
        }

        User owner = userService.getCurrentUser();
        DocumentFile document = documentFileService.uploadFile(file, owner);
        
        DocumentResponse response = new DocumentResponse(document);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @GetMapping
    @Operation(
        summary="Get all documents",
        description="Get all documents for the current user"
    )
    public ResponseEntity<List<DocumentResponse>> getAllDocuments() {
        User owner = userService.getCurrentUser();
        List<DocumentFile> documents = documentFileService.getUserDocuments(owner);
        
        List<DocumentResponse> response = documents.stream()
            .map(doc -> new DocumentResponse(doc))
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    @Operation(
        summary="Download a document",
        description="Download a specific document by ID"
    )
    public ResponseEntity<Resource> downloadDocument(@PathVariable String id) {
        DocumentFile document = documentFileService.getDocumentById(id);
        Resource resource = documentFileService.downloadFile(id);
        
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getName() + "\"")
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(resource);
    }
    
    @DeleteMapping("/{id}")
    @Operation(
        summary="Delete a document",
        description="Delete a specific document by ID"
    )
    public ResponseEntity<MessageResponse> deleteDocument(@PathVariable String id) {
        documentFileService.deleteDocument(id);
        return ResponseEntity.ok(new MessageResponse("Document deleted successfully"));
    }
}
