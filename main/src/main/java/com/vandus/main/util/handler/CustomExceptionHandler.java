package com.vandus.main.util.handler;

import com.vandus.main.dto.ErrorResponse;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UnableToSendOTPException;
import com.vandus.main.util.exception.UserAlreadyExistsException;
import com.vandus.main.util.exception.InvalidOTPException;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class CustomExceptionHandler {

    private ResponseEntity<ErrorResponse> handleException(HttpStatusCode statusCode, Exception exception) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setError(exception.getMessage());
        return ResponseEntity.status(statusCode).body(errorResponse);
    }

    @ExceptionHandler(InvalidEmailPasswordException.class)
    public ResponseEntity<ErrorResponse> handleInvalidEmailPasswordException(
            InvalidEmailPasswordException exception) {
        return handleException(HttpStatus.UNAUTHORIZED, exception);
    }

    @ExceptionHandler(UnableToSendOTPException.class)
    public ResponseEntity<ErrorResponse> handleUnableToSendOTPException(
            UnableToSendOTPException exception) {
        return handleException(HttpStatus.INTERNAL_SERVER_ERROR, exception);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(
            UserAlreadyExistsException exception) {
        return handleException(HttpStatus.CONFLICT, exception);
    }

    @ExceptionHandler(InvalidOTPException.class)
    public ResponseEntity<ErrorResponse> handleInvalidOTPException(
            InvalidOTPException exception) {
        return handleException(HttpStatus.UNAUTHORIZED, exception);
    }
}
