package com.vandus.main.util.handler;

import com.vandus.main.dto.ErrorResponse;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UnableToSendOTPException;
import com.vandus.main.util.exception.UserAlreadyExistsException;
import com.vandus.main.util.exception.UserNotFoundException;
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
    /*
        Error:Invalid Email Password
        Status: 401 Unauthorized

     */
    public ResponseEntity<ErrorResponse> handleInvalidEmailPasswordException(
            InvalidEmailPasswordException exception) {
        return handleException(HttpStatus.UNAUTHORIZED, exception);
    }

    @ExceptionHandler(UnableToSendOTPException.class)
    /*
        Error: unable to send Otp
        Status: 500 Internal Server Error
     */
    public ResponseEntity<ErrorResponse> handleUnableToSendOTPException(
            UnableToSendOTPException exception) {
        return handleException(HttpStatus.INTERNAL_SERVER_ERROR, exception);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    /*
        Error: User already Exist
        Status: 400 Bad Request
     */
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(
            UserAlreadyExistsException exception) {
        return handleException(HttpStatus.CONFLICT, exception);
    }

    @ExceptionHandler(InvalidOTPException.class)
    /*
        Error: Invalid OTP
        Status: 401 Unauthorized
     */
    public ResponseEntity<ErrorResponse> handleInvalidOTPException(
            InvalidOTPException exception) {
        return handleException(HttpStatus.UNAUTHORIZED, exception);
    }
    @ExceptionHandler(UserNotFoundException.class)
    /*
        Error: User Not Found
        Status: 404 Not Found
     */
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(
        UserNotFoundException exception){
            return handleException(HttpStatus.NOT_FOUND, exception);
        }
}
