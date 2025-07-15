package com.vandus.main.util.handler;

import com.vandus.main.dto.ErrorResponse;
import com.vandus.main.util.ExceptionHandlerUtil;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UnableToSendOTPException;
import com.vandus.main.util.exception.UserAlreadyExistsException;
import com.vandus.main.util.exception.UserNotFoundException;
import com.vandus.main.util.exception.InvalidOTPException;
import com.vandus.main.util.exception.InvalidFileException;
import com.vandus.main.util.exception.UnableToUploadFileException;
import com.vandus.main.util.exception.DocumentNotFoundException;
import com.vandus.main.util.exception.ProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@RestControllerAdvice
public class CustomExceptionHandler {

    @Autowired
    private ExceptionHandlerUtil handlerUtil;

    @ExceptionHandler(InvalidEmailPasswordException.class)
    /*
     * Error: Invalid email or password
     * Status: 401 Unauthorized
     */
    public ResponseEntity<ErrorResponse> handleInvalidEmailPasswordException(
            InvalidEmailPasswordException exception) {
        return handlerUtil.handleException(HttpStatus.UNAUTHORIZED, exception);
    }

    @ExceptionHandler(UnableToSendOTPException.class)
    /*
     * Error: Unable to send OTP
     * Status: 500 Internal Server Error
     */
    public ResponseEntity<ErrorResponse> handleUnableToSendOTPException(
            UnableToSendOTPException exception) {
        return handlerUtil.handleException(HttpStatus.INTERNAL_SERVER_ERROR, exception);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    /*
     * Error: User already exists
     * Status: 409 Conflict
     */
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(
            UserAlreadyExistsException exception) {
        return handlerUtil.handleException(HttpStatus.CONFLICT, exception);
    }

    @ExceptionHandler(InvalidOTPException.class)
    /*
     * Error: Invalid OTP
     * Status: 401 Unauthorized
     */
    public ResponseEntity<ErrorResponse> handleInvalidOTPException(
            InvalidOTPException exception) {
        return handlerUtil.handleException(HttpStatus.UNAUTHORIZED, exception);
    }

    @ExceptionHandler(UserNotFoundException.class)
    /*
     * Error: User not found
     * Status: 404 Not Found
     */
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(
            UserNotFoundException exception) {
        return handlerUtil.handleException(HttpStatus.NOT_FOUND, exception);
    }

    @ExceptionHandler(InvalidFileException.class)
    /*
     * Error: Invalid file type or file is empty
     * Status: 400 Bad Request
     */
    public ResponseEntity<ErrorResponse> handleInvalidFileException(
            InvalidFileException exception) {
        return handlerUtil.handleException(HttpStatus.BAD_REQUEST, exception);
    }    
    
    @ExceptionHandler(UnableToUploadFileException.class)
    /*
     * Error: Failed to upload file
     * Status: 500 Internal Server Error
     */
    public ResponseEntity<ErrorResponse> handleUnableToUploadFileException(
            UnableToUploadFileException exception) {
        return handlerUtil.handleException(HttpStatus.INTERNAL_SERVER_ERROR, exception);
    }

    @ExceptionHandler(DocumentNotFoundException.class)
    /*
     * Error: Document not found
     * Status: 404 Not Found
     */
    public ResponseEntity<ErrorResponse> handleDocumentNotFoundException(
            DocumentNotFoundException exception) {
        return handlerUtil.handleException(HttpStatus.NOT_FOUND, exception);
    }
    
    @ExceptionHandler(ProcessingException.class)
    /*
     * Error: Processing error (OCR, NLP, etc.)
     * Status: 422 Unprocessable Entity
     */
    public ResponseEntity<ErrorResponse> handleProcessingException(
            ProcessingException exception) {
        return handlerUtil.handleException(HttpStatus.UNPROCESSABLE_ENTITY, exception);
    }
}
