package com.vandus.main.util;

import com.vandus.main.dto.ErrorResponse;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UnableToSendOTPException;
import com.vandus.main.util.exception.UserAlreadyExistsException;
import com.vandus.main.util.exception.InvalidOTPException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidEmailPasswordException.class)
    public ResponseEntity<ErrorResponse> handleInvalidEmailPasswordException(
            InvalidEmailPasswordException exception) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setError(exception.getMessage());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    @ExceptionHandler(UnableToSendOTPException.class)
    public ResponseEntity<ErrorResponse> handleUnableToSendOTPException(
            UnableToSendOTPException exception) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setError(exception.getMessage());

        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(
            UserAlreadyExistsException exception) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setError(exception.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }

    @ExceptionHandler(InvalidOTPException.class)
    public ResponseEntity<ErrorResponse> handleInvalidOTPException(
            InvalidOTPException exception) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setError(exception.getMessage());

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }
}
