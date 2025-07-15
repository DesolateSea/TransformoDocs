package com.vandus.main.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.NotBlank;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class OCRRequest {
    
    @NotBlank(message = "Document ID is required")
    private String documentId;
}
