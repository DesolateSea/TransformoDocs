package com.vandus.main.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.vandus.main.util.exception.DocumentNotFoundException;

import org.springframework.data.mongodb.core.index.Indexed;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.io.File;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Document(collection = "documents")
@Getter @Setter @Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentFile {

    @Id
    private String id;

    private String name;
    private String path;

    @DBRef
    private User owner;

    @CreatedDate
    private Instant createdAt;
    
    @Indexed(expireAfterSeconds = 0)
    private Instant expiryDate;
    
    /**
     * Calculates and sets the expiry date based on whether the document has an owner.
     * Documents with an owner expire after 30 days.
     * Documents without an owner expire after 1 day.
     */
    public void calculateExpiryDate() {
        int expiryDays = owner != null ? 30 : 1;
        this.expiryDate = Instant.now().plus(expiryDays, ChronoUnit.DAYS);
    }

    public File getFile() {
        File file = new File(this.path);
        if (!file.exists() || !file.isFile())
            throw new DocumentNotFoundException("Document file not found: " + this.path);
        
        return file;
    }
}