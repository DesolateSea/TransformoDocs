package com.vandus.main.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ValidationErrorResponse {
    protected String message;
    protected List<FieldErrorDetails> errors;

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    public static class FieldErrorDetails {
        protected String field;
        protected String error;
    }
}
