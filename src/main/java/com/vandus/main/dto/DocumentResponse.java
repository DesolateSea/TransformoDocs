package com.vandus.main.dto;

import com.vandus.main.model.DocumentFile;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class DocumentResponse extends MessageResponse {
    private String id;
    private String name;

    /**
     * Constructor for creating a new DocumentResponse object.
     * 
     * @param document The DocumentFile object to create the response for
     */
    public DocumentResponse(DocumentFile document) {
        this.id = document.getId();
        this.name = document.getName();
    }
}
