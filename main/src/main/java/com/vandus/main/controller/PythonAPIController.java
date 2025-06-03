package com.vandus.main.controller;

import java.util.Optional;
import com.vandus.main.dto.ContentRequest;
import com.vandus.main.service.PythonAPIService;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestPart;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${vandus.api.public}")
@Tag(
    name="Public API for ML services",
    description="API endpoints for our ML services"
)
@RequiredArgsConstructor
public class PythonAPIController {
      
    private final PythonAPIService pythonApiService;

    @GetMapping("/health")
    public String checkHealth() {
        return pythonApiService.checkHealth();
    }

    @PostMapping("/named-entity-recognition")
    public String namedEntityRecognition(@RequestBody ContentRequest request) {
        return pythonApiService.namedEntityRecognition(request.getText());
    }

    @PostMapping("/sentiment-analysis")
    public String sentimentAnalysis(@RequestBody ContentRequest request) {
        return pythonApiService.sentimentAnalysis(request.getText());
    }

    @PostMapping(value = "/optical-character-recognition", consumes = "multipart/form-data")
    public String opticalCharacterRecognition(@RequestPart("pdf") MultipartFile pdfFile) {        
        if (pdfFile == null || pdfFile.isEmpty()) {
            return "Error: No PDF file provided";
        }
        
        String filename = pdfFile.getOriginalFilename();
        if (!Optional.ofNullable(filename)
                .map(String::toLowerCase)
                .filter(name -> name.endsWith(".pdf"))
                .isPresent()) {
            System.out.println("\n\033[1;33m[LOG]\033[0m Invalid file format. Only PDF is allowed.");
            return "Error: Invalid file format. Only PDF is allowed.";
        }
        
        System.out.println("\n\033[1;33m[LOG]\033[0m OCR processing file: \033[1;34m" + filename + "\033[0m");
        return pythonApiService.opticalCharacterRecognition(pdfFile);
    }
    
}
