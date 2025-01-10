package com.vandus.main.util;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UnableToSendOTPException;
import com.vandus.main.util.exception.UserAlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import com.vandus.main.dto.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidEmailPasswordException.class)
    public ResponseEntity<ErrorResponse> handleInvalidEmailPasswordException(
            InvalidEmailPasswordException exception) {
        ErrorResponse errorResponse=new ErrorResponse();
        errorResponse.setError(exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }
    @ExceptionHandler(UnableToSendOTPException.class)
    public ResponseEntity<ErrorResponse> UnableToSendOTPException(
            UnableToSendOTPException exception) {
        ErrorResponse errorResponse=new ErrorResponse();
        errorResponse.setError(exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleInvalidEmailPasswordException(
            UserAlreadyExistsException exception) {
        ErrorResponse errorResponse=new ErrorResponse();
        errorResponse.setError(exception.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }
}
