package com.vandus.main.util;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.vandus.main.dto.ErrorResponse;

@Component
public class ExceptionHandlerUtil {
    
    public ResponseEntity<ErrorResponse> handleException(HttpStatusCode statusCode, Exception exception) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setError(exception.getMessage());
        
        return ResponseEntity.status(statusCode).body(errorResponse);
    }

    public ResponseEntity<ErrorResponse> handleException(HttpStatusCode statusCode, String message) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setError(message);
        
        return ResponseEntity.status(statusCode).body(errorResponse);
    }
}
