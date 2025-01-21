package com.vandus.main.controller;

import com.vandus.main.service.FileUploadService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("${vandus.api.private}/file-upload")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @PostMapping("/pdf")
    public ResponseEntity<String> pdfUpload(@RequestParam("pdf") MultipartFile file) {
        if (file.isEmpty() || !"application/pdf".equalsIgnoreCase(file.getContentType())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file type or file is empty.");
        }

        try {
            File tmp = fileUploadService.uploadFile(file);
            return ResponseEntity.ok("File uploaded successfully at: " + tmp.getAbsolutePath());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        }
    }
}
