package com.vandus.main.controller;

import java.util.Optional;
import com.vandus.main.dto.ContentRequest;
import com.vandus.main.service.NLPService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
public class MLServicesController {
      
    private final NLPService nlpService;
    
    @GetMapping("/health")
    @Operation(
        summary="Check API health",
        description="Verify if the NLP service is operational"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Service is healthy"),
        @ApiResponse(responseCode = "500", description = "Service is not available")
    })
    public String checkHealth() {
        return nlpService.checkHealth();
    }
    
    @PostMapping("/named-entity-recognition")
    @Operation(
        summary="Named Entity Recognition",
        description="Extracts named entities (people, places, organizations, etc.) from text"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Named entities extracted successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input text")
    })
    public String namedEntityRecognition(@RequestBody ContentRequest request) {
        return nlpService.namedEntityRecognition(request.getText());
    }
    
    @PostMapping("/sentiment-analysis")
    @Operation(
        summary="Sentiment Analysis",
        description="Analyzes the sentiment (positive, negative, neutral) of provided text"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Sentiment analysis completed successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input text")
    })
    public String sentimentAnalysis(@RequestBody ContentRequest request) {
        return nlpService.sentimentAnalysis(request.getText());
    }
    
    @PostMapping(value = "/optical-character-recognition", consumes = "multipart/form-data")
    @Operation(
        summary="Optical Character Recognition",
        description="Extracts text from PDF documents using OCR technology"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Text extracted successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid file format or empty file"),
        @ApiResponse(responseCode = "500", description = "OCR processing error")
    })
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
        return nlpService.opticalCharacterRecognition(pdfFile);
    }
    
}
