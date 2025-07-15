package com.vandus.main.util.exception;

public class UnableToSendOTPException extends RuntimeException {
    public UnableToSendOTPException(String message) {
        super(message);
    }
}
