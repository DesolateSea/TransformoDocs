package com.vandus.main.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.Instant;

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
}