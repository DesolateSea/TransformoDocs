package com.vandus.main.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Document(collection="users")
@Getter @Setter
public class User {
    
    @Id
    private String id;

    private String email;
    private boolean emailVerified;

    @JsonIgnore
    private String password;

    @DBRef
    private List<DocumentFile> documents = new ArrayList<>();

    public User(String email, String password) {
        this.email = email;
        this.password = password;
        this.emailVerified = false;
    }

    /**
     * Adds a document to the user's list of documents.
     * 
     * @param document The document to add
     */
    public void addDocument(DocumentFile document) {
        if (documents == null) {
            documents = new ArrayList<>();
        }
        documents.add(document);
    }
}
