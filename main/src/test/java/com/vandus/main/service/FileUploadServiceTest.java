package com.vandus.main.service;

import com.vandus.main.util.exception.UnableToUploadFileException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class FileUploadServiceTest {

    @InjectMocks
    private FileUploadService fileUploadService;

    private final String testUploadDir = "target/test-uploads";

    @BeforeEach
    void setUp() {
        // Set the upload directory for testing
        ReflectionTestUtils.setField(fileUploadService, "fileUploadDirectory", testUploadDir);
        
        // Create the test directory if it doesn't exist
        File directory = new File(testUploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        } else {
            // Clean up any existing files
            File[] files = directory.listFiles();
            if (files != null) {
                for (File file : files) {
                    file.delete();
                }
            }
        }
    }    @Test
    void uploadFile_Success() {
        // Arrange
        String filename = "test-file.txt";
        byte[] content = "test content".getBytes();
        MockMultipartFile multipartFile = new MockMultipartFile(
                "file", 
                filename,
                "text/plain", 
                content);
        
        // Act
        File result = fileUploadService.uploadFile(multipartFile);
        
        // Assert
        assertTrue(result.exists(), "File should exist");
        assertEquals(filename, result.getName(), "File name should match");
        
        // Use canonical path for comparison to handle path separators properly
        File expected = new File(testUploadDir, filename);
        try {
            assertEquals(expected.getCanonicalPath(), result.getCanonicalPath(), 
                "File paths should match regardless of separator style");
        } catch (IOException e) {
            fail("Failed to get canonical path: " + e.getMessage());
        }
    }

    @Test
    void uploadFile_IOExceptionThrown_ThrowsUnableToUploadFileException() throws IOException {
        // Arrange
        MultipartFile mockFile = Mockito.mock(MultipartFile.class);
        when(mockFile.getOriginalFilename()).thenReturn("test-file.txt");
        doThrow(IOException.class).when(mockFile).transferTo(any(File.class));
        
        // Act & Assert
        assertThrows(UnableToUploadFileException.class, () -> {
            fileUploadService.uploadFile(mockFile);
        });
    }    @Test
    void uploadFile_CreatesDirectoryIfNotExists() {
        // Arrange
        String nonExistentDir = testUploadDir + File.separator + "nested";
        ReflectionTestUtils.setField(fileUploadService, "fileUploadDirectory", nonExistentDir);
        
        File directory = new File(nonExistentDir);
        if (directory.exists()) {
            // Delete all files in the directory first
            File[] files = directory.listFiles();
            if (files != null) {
                for (File file : files) {
                    file.delete();
                }
            }
            // Now try to delete the empty directory
            directory.delete();
        }
        // If still exists, just ignore and create a new test file
        
        String filename = "nested-test-file.txt";
        byte[] content = "test content".getBytes();
        MockMultipartFile multipartFile = new MockMultipartFile(
                "file", 
                filename,
                "text/plain", 
                content);
        
        // Act
        File result = fileUploadService.uploadFile(multipartFile);
        
        // Assert
        assertTrue(directory.exists(), "Directory should have been created");
        assertTrue(result.exists(), "File should have been created");
    }
}
