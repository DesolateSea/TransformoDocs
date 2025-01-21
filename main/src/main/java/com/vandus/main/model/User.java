package com.vandus.main.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    public User(String email, String password) {
        this.email = email;
        this.password = password;
        this.emailVerified = false;
    }
}
