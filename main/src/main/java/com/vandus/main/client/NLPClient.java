package com.vandus.main.client;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

/**
 * Client interface for interacting with the Python Backend for NLP services.
 */
@HttpExchange(accept = "application/json")
public interface NLPClient {
    
    /**
     * Checks the health of the Python API service.
     * 
     * @return A string indicating the health status of the service
     */
    @GetExchange("/health")
    String checkHealth();

    /**
     * Performs Named Entity Recognition (NER) on the provided text.
     * 
     * @param text The text to analyze for named entities
     * @return A JSON string containing the recognized entities
     */
    @GetExchange("/ner")
    String namedEntityRecognition(@RequestParam("text") String text);

    /**
     * Performs sentiment analysis on the provided text.
     * 
     * @param text The text to analyze for sentiment
     * @return A JSON string containing the sentiment analysis results
     */
    @GetExchange("/sentiment")
    String sentimentAnalysis(@RequestParam("text") String text);

    /**
     * Performs sentiment analysis on the provided text.
     *
     * @param text The text to analyze for data extraction
     * @return A JSON string containing the data extraction results
     */
    @GetExchange("/dataExtractor")
    String dataExtraction(
        @RequestParam("text") String text,
        @RequestParam(value = "documentType", required = false) String documentType,
        @RequestParam(value = "analyzeOnly", required = false) Boolean analyzeOnly
    );
    }
