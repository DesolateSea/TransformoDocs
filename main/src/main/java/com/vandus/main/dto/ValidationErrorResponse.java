package com.vandus.main.dto;

import java.util.List;

public class ValidationErrorResponse {
    private String message;
    private List<FieldErrorDetails> errors;

    public ValidationErrorResponse(String message, List<FieldErrorDetails> errors) {
        this.message = message;
        this.errors = errors;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<FieldErrorDetails> getErrors() {
        return errors;
    }

    public void setErrors(List<FieldErrorDetails> errors) {
        this.errors = errors;
    }

    public static class FieldErrorDetails {
        private String field;
        private String error;

        public FieldErrorDetails(String field, String error) {
            this.field = field;
            this.error = error;
        }

        public String getField() {
            return field;
        }

        public void setField(String field) {
            this.field = field;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }
    }
}
