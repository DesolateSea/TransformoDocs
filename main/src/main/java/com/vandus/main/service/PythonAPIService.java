package com.vandus.main.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.core.io.InputStreamResource;
import java.io.ByteArrayInputStream;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

import com.vandus.main.client.PythonAPIClient;
import com.vandus.main.dto.OCRResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PythonAPIService {

    private final PythonAPIClient pythonAPI;
    private final RestClient restClient;
    private static final Logger logger = LoggerFactory.getLogger(PythonAPIService.class);
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB limit

    public PythonAPIService(RestClient.Builder builder, @Value("${vandus.python.api.url}") String url) {
        this.restClient = builder.baseUrl(url).build();
        RestClientAdapter adapter = RestClientAdapter.create(restClient);
        HttpServiceProxyFactory factory = HttpServiceProxyFactory.builderFor(adapter).build();
        this.pythonAPI = factory.createClient(PythonAPIClient.class);
    }

    public String checkHealth() {
        return pythonAPI.checkHealth();
    }

    public String nameEntityRecognition(String text) {
        return pythonAPI.nameEntityRecognition(text);
    }

    public String sentimentAnalysis(String text) {
        return pythonAPI.sentimentAnalysis(text);
    }
        
    public String opticalCharacterRecognition(MultipartFile pdfFile) {
        try {
            // 1. Validate if the file is empty
            if (pdfFile.isEmpty()) {
                return "Error: Uploaded file is empty.";
            }
    
            // 2. Validate file size
            if (pdfFile.getSize() > MAX_FILE_SIZE) {
                return "Error: File size exceeds the 5MB limit.";
            }
    
            // 3. Validate file type (must be PDF)
            String contentType = pdfFile.getContentType();
            if (!Objects.equals(contentType, MediaType.APPLICATION_PDF_VALUE)) {
                return "Error: Only PDF files are allowed.";
            }
    
            // 4. Rename the file: name-yyyyMMdd_HHmmss.pdf
            String originalFilename = pdfFile.getOriginalFilename();
            String baseName = (originalFilename != null && !originalFilename.isEmpty())
                ? originalFilename.replaceAll("\\.pdf$", "")
                : "file";
            String timestamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String newFilename = baseName + "-" + timestamp + ".pdf";
    
            logger.info("Processing OCR for file: {}", newFilename);
    
            // 5. Build multipart data using MultipartBodyBuilder
            MultipartBodyBuilder builder = new MultipartBodyBuilder();
            builder.part("pdf", new InputStreamResource(new ByteArrayInputStream(pdfFile.getBytes())) {
                @Override
                public String getFilename() {
                    return newFilename;
                }
                @Override
                public long contentLength() {
                    // Return the known file size to avoid re-reading the stream
                    return pdfFile.getSize();
                }
            });
            MultiValueMap<String, HttpEntity<?>> multipartData = builder.build();
    
            // 6. Call Python API using RestClient and pass the multipart data directly.
            ResponseEntity<OCRResponse> response = restClient.method(HttpMethod.POST)
                .uri("/ocr")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA_VALUE)
                .body(multipartData)
                .retrieve()
                .toEntity(OCRResponse.class);
    
            OCRResponse ocrResponse = response.getBody();
            if (ocrResponse == null) {
                logger.warn("No response body received from OCR service");
                return "Error: No response from OCR service";
            }
    
            // 7. Process the OCR response
            if (ocrResponse.message().startsWith("Error") || ocrResponse.text().isEmpty()) {
                return ocrResponse.message();
            }
    
            return String.join("\n", ocrResponse.text());
    
        } catch (HttpClientErrorException e) {
            logger.error("HTTP error from OCR service: {}", e.getStatusCode(), e);
            return "Error: OCR service returned " + e.getStatusCode();
        } catch (Exception e) {
            logger.error("Error processing OCR: ", e);
            return "Error: " + e.getMessage();
        }
    }
    
}