package com.vandus.main.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Service
public class FileUploadService {

    @Value("${vandus.fileupload.directory}")
    private String fileUploadDirectory;

    public File uploadFile(MultipartFile file) throws IOException {
        File directory = new File(fileUploadDirectory);
        if (!directory.exists()) directory.mkdirs();

        File destination = new File(directory, file.getOriginalFilename());
        file.transferTo(destination);

        return destination;
    }
}
