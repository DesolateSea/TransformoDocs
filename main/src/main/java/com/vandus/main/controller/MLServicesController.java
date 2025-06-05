package com.vandus.main.controller;

import com.vandus.main.dto.ContentRequest;
import com.vandus.main.dto.NLPResponse;
import com.vandus.main.dto.OCRRequest;
import com.vandus.main.dto.OCRResultResponse;
import com.vandus.main.service.NLPService;
import com.vandus.main.dto.DataAgentExtraction;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import java.util.List;

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
    public ResponseEntity<NLPResponse> processNamedEntityRecognition(@Valid @RequestBody ContentRequest request) {
        String result = nlpService.processNamedEntityRecognition(request.getText());
        NLPResponse response = new NLPResponse(result);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/sentiment-analysis")
    @Operation(
        summary="Sentiment Analysis",
        description="Analyzes the sentiment (positive, negative, neutral) of provided text"
    )
    public ResponseEntity<NLPResponse> processSentimentAnalysis(@Valid @RequestBody ContentRequest request) {
        String result = nlpService.processSentimentAnalysis(request.getText());
        NLPResponse response = new NLPResponse(result);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/ocr")
    @Operation(
        summary="Optical Character Recognition",
        description="Extracts text from PDF documents using OCR technology based on document ID"
    )
    public ResponseEntity<OCRResultResponse> processDocumentWithOcr(@Valid @RequestBody OCRRequest request) {
        List<String> result = nlpService.processDocumentOCR(request.getDocumentId());
        OCRResultResponse response = new OCRResultResponse(result);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/dataextraction")
    @Operation(
        summary="Data Extraction",
        description="Extracts data from text using a pre-trained model"
    )
    public ResponseEntity<Object> processDataExtraction(@Valid @RequestBody DataAgentExtraction request) {
        Object result = nlpService.processDataInfoExtraction(request.getText(), request.getDocumentType(), request.getAnalyzeOnly());
        return ResponseEntity.ok(result);
    }
}
