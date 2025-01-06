package com.vandus.main.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@RequestMapping("${vandus.api.public}/upload")
public class FileUploadController {
    
    @Value("${vandus.fileupload.directory}")
    private String fileUploadDirectory;

    @PostMapping("/pdf")
    public ResponseEntity<String> pdfUpload(@RequestParam("pdf") MultipartFile file) {
        if (file.isEmpty() || !file.getContentType().equals("application/pdf"))
            return ResponseEntity.status(400).body("Invalid file type or file is empty.");

        try {
            File directory = new File(fileUploadDirectory);
            if (!directory.exists()) directory.mkdirs();

            File destination = new File(directory, file.getOriginalFilename());
            file.transferTo(destination);

            return ResponseEntity.ok("File uploaded successfully at: " + destination.getAbsolutePath());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
        }
    }

    
}
