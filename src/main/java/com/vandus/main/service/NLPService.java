package com.vandus.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.core.io.InputStreamResource;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

import com.vandus.main.client.NLPClient;
import com.vandus.main.dto.OCRResponse;
import com.vandus.main.model.DocumentFile;
import com.vandus.main.util.exception.DocumentNotFoundException;
import com.vandus.main.util.exception.ProcessingException;
import com.vandus.main.util.handler.Utility;

/**
 * Service for interacting with the Python API backend.
 * Provides methods for natural language processing tasks such as OCR, NER, and sentiment analysis.
 */
@Service
public class NLPService {

    private final NLPClient pythonAPI;
    private final RestClient restClient;
    private final DocumentFileService documentFileService;
    
    /**
     * Constructs a NLPService with the specified REST client builder, API URL, and document service.
     * 
     * @param builder The RestClient.Builder to use for building the REST client
     * @param url The base URL of the Python API, injected from configuration
     * @param documentFileService The service for accessing document files
     */
    public NLPService(
            RestClient.Builder builder, 
            @Value("${vandus.python.api.url}") String url,
            DocumentFileService documentFileService) {

        this.restClient = builder.baseUrl(url).build();
        RestClientAdapter adapter = RestClientAdapter.create(restClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();
        this.pythonAPI = factory.createClient(NLPClient.class);
        this.documentFileService = documentFileService;
    }

    /**
     * Checks the health of the Python API service.
     * 
     * @return A string indicating the health status of the service
     */
    public String checkHealth() {
        return pythonAPI.checkHealth();
    }
    
    /**
     * Performs Named Entity Recognition (NER) on the provided text.
     * Returns a structured NLPResponse object.
     * 
     * @param text The text to analyze for named entities
     * @return Result of the NER analysis
     * @throws ProcessingException if there is an error processing the request
     */
    public String processNamedEntityRecognition(String text) {
        if (text == null || text.trim().isEmpty())
            throw new ProcessingException("Text cannot be empty");
        
        String result = pythonAPI.namedEntityRecognition(text);
        return result;
    }
    
    /**
     * Performs sentiment analysis on the provided text.
     * Returns a structured NLPResponse object.
     * 
     * @param text The text to analyze for sentiment
     * @return Result of the sentiment analysis
     * @throws ProcessingException if there is an error processing the request
     */
    public String processSentimentAnalysis(String text) {
        if (text == null || text.trim().isEmpty())
            throw new ProcessingException("Text cannot be empty");
        
        String result = pythonAPI.sentimentAnalysis(text);
        return result;
    }

    /**
     * Performs Optical Character Recognition (OCR) on a PDF file referenced by document ID.
     * Retrieves the document, validates it, and sends it to the Python API for processing.
     * 
     * @param documentId The ID of the DocumentFile to process
     * @return An OCRResultResponse with the extraction results or error information
     * @throws DocumentNotFoundException If the document with the specified ID doesn't exist
     * @throws ProcessingException If there's an error processing the document
     */    
    public List<String> processDocumentOCR(String documentId) {
        try {
            DocumentFile document = documentFileService.getDocumentById(documentId);

            OCRResponse ocrResponse = performOCR(document);

            if (ocrResponse == null)
                throw new ProcessingException("No response from OCR service");
            
            List<String> result = ocrResponse.getText();
            Optional<String> error = ocrResponse.getError();
            if (error.isPresent())
                throw new ProcessingException("OCR service error: " + error.get());
            
            return result;
        } catch (IOException e) {
            throw new ProcessingException("Error reading file: " + e.getMessage(), e);
        } catch (HttpClientErrorException e) {
            throw new ProcessingException("OCR service error: " + e.getStatusCode(), e);
        } catch (Exception e) {
            throw new ProcessingException("Error processing document: " + e.getMessage(), e);
        }
    }
  
    private OCRResponse performOCR(DocumentFile document) throws IOException {
        File file = document.getFile();
        MultipartBodyBuilder builder = new MultipartBodyBuilder();

        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            builder.part("pdf", new InputStreamResource(fileInputStream) {
                @Override
                public String getFilename() {
                    return document.getName();
                }

                @Override
                public long contentLength() {
                    return file.length();
                }
            });

            MultiValueMap<String, HttpEntity<?>> multipartData = builder.build();

            ResponseEntity<OCRResponse> response = restClient.method(HttpMethod.POST)
                .uri("/ocr")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA_VALUE)
                .body(multipartData)
                .retrieve()
                .toEntity(OCRResponse.class);

            return response.getBody();
        }
    }
    public Object processDataInfoExtraction(String text, String documentType, Boolean analyzeOnly) {
        if (text == null || text.trim().isEmpty())
            throw new ProcessingException("Text cannot be empty");

        try {
            String responseJson = pythonAPI.dataExtraction(text, documentType, analyzeOnly);
            // Assuming the response can be one of multiple structures, deserialize dynamically
            return Utility.parseFlexibleJson(responseJson);
        } catch (Exception e) {
            throw new ProcessingException("Failed to extract data: " + e.getMessage(), e);
        }
    }
    

}