package com.vandus.main.util.handler;

import com.vandus.main.util.ExceptionHandlerUtil;
import com.vandus.main.dto.ErrorResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;

@RestControllerAdvice
public class JwtExceptionHandler {
    
    @Autowired
    private ExceptionHandlerUtil handlerUtil;

    /*
     * Error: Token has expired
     * Status: 401 Unauthorized
     */
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ErrorResponse> handleExpiredJwtException(ExpiredJwtException ex) {
        return handlerUtil.handleException(HttpStatus.UNAUTHORIZED, ex);
    }

    /*
     * Error: Token is malformed
     * Status: 401 Unauthorized
     */
    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ErrorResponse> handleMalformedJwtException(MalformedJwtException ex) {
        return handlerUtil.handleException(HttpStatus.UNAUTHORIZED, ex);
    }

    /*
     * Error: Token type is unsupported
     * Status: 401 Unauthorized
     */
    @ExceptionHandler(UnsupportedJwtException.class)
    public ResponseEntity<ErrorResponse> handleUnsupportedJwtException(UnsupportedJwtException ex) {
        return handlerUtil.handleException(HttpStatus.UNAUTHORIZED, ex);
    }
}
