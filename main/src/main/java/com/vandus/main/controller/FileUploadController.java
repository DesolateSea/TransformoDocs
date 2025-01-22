package com.vandus.main.controller;

import com.vandus.main.dto.MessageResponse;
import com.vandus.main.service.FileUploadService;
import com.vandus.main.util.exception.InvalidFileException;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.File;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("${vandus.api.public}/file-upload")
@Tag(
    name="File Upload API",
    description="API for handling file uploads and downloads for the client application"
)
@RequiredArgsConstructor
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @PostMapping("/pdf")
    @Operation(
        summary="Upload a PDF file",
        description="Upload a PDF file to the server"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "File uploaded successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid file type or file is empty"),
        @ApiResponse(responseCode = "500", description = "Failed to upload file")
    })
    public ResponseEntity<MessageResponse> pdfUpload(@RequestParam("pdf") MultipartFile file) {
        if (file.isEmpty() || !"application/pdf".equalsIgnoreCase(file.getContentType()))
            throw new InvalidFileException("Invalid file type or file is empty");

        File tmp = fileUploadService.uploadFile(file);
        MessageResponse response = new MessageResponse("File uploaded successfully at: " + tmp.getAbsolutePath());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
