package com.vandus.main.util.handler;

import com.vandus.main.dto.ErrorResponse;
import com.vandus.main.dto.ValidationErrorResponse;
import com.vandus.main.util.ExceptionHandlerUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;

import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.List;
import static java.util.stream.Collectors.toList;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @Autowired
    private ExceptionHandlerUtil handlerUtil;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    /*
     * Error: Validation error
     * Status: 400 Bad Request
     */
    public ResponseEntity<ValidationErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<ValidationErrorResponse.FieldErrorDetails> errorDetails = ex.getBindingResult()
                .getAllErrors()
                .stream()
                .map(error -> {
                    String fieldName = ((FieldError) error).getField();
                    String errorMessage = error.getDefaultMessage();
                    return new ValidationErrorResponse.FieldErrorDetails(fieldName, errorMessage);
                })
                .collect(toList());

        
        ValidationErrorResponse errorResponse = new ValidationErrorResponse("Validation failed", errorDetails);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(RuntimeException.class)
    /**
     * Fallback handler for all other exceptions
     * Status: 500 Internal Server Error
     */
    public ResponseEntity<ErrorResponse> handleAllRuntimeException(Exception ex) {
        return handlerUtil.handleException(
                HttpStatus.INTERNAL_SERVER_ERROR, 
                ex.getClass().getName() + ": " + ex.getMessage()
        );
    }
}
