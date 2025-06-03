package com.vandus.main.client;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

import com.vandus.main.dto.OCRResponse;

import org.springframework.web.multipart.MultipartFile;
@HttpExchange(accept = "application/json")
public interface PythonAPIClient {
    
    @GetExchange("/health")
    String checkHealth();

    @GetExchange("/ner")
    String namedEntityRecognition(@RequestParam("text") String text);

    @GetExchange("/sentiment")
    String sentimentAnalysis(@RequestParam("text") String text);

    OCRResponse opticalCharacterRecognition(@RequestParam("pdf") MultipartFile pdf);
}
