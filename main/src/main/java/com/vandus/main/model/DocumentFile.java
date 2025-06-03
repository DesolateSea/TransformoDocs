package com.vandus.main.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Document(collection = "documents")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class DocumentFile {

    @Id
    private String id;

    private String name;
    private String path;

    @DBRef
    private User owner;

}