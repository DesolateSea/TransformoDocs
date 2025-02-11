package com.vandus.main.service;

import com.vandus.main.util.exception.UnableToUploadFileException;

import org.springframework.web.multipart.MultipartFile;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class FileUploadService {

    @Value("${vandus.fileupload.directory}")
    private String fileUploadDirectory;

    public File uploadFile(MultipartFile file) {
        File directory = new File(fileUploadDirectory);
        if (!directory.exists()) directory.mkdirs();

        File destination = new File(directory, file.getOriginalFilename());

        try {
            file.transferTo(destination);
        } catch (IOException e) {
            throw new UnableToUploadFileException("Failed to upload file", e);
        }

        return destination;
    }
}
