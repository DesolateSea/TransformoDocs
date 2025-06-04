package com.vandus.main.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;
import java.util.Collections;

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

    private Set<UserRole> roles = new HashSet<>(Collections.singleton(UserRole.USER));

    @DBRef
    private List<DocumentFile> documents = new ArrayList<>();

    /**
     * Constructor for a new user.
     * Sets email and password, and marks emailVerified as false.
     * Default role is USER.
     * 
     * @param email The user's email
     * @param password The user's password
     */
    public User(String email, String password) {
        this.email = email;
        this.password = password;
        this.emailVerified = false;
        this.roles = new HashSet<>(Collections.singleton(UserRole.USER));
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
    
    /**
     * Adds a role to the user.
     * 
     * @param role The role to add
     */
    public void addRole(UserRole role) {
        if (roles == null) {
            roles = new HashSet<>();
        }
        roles.add(role);
    }

    /**
     * Removes a role from the user.
     *
     * @param role
     * @return
     */
    public void removeRole(UserRole role) {
        if (roles != null) {
            roles.remove(role);
        }
    }
    
    /**
     * Checks if the user has a specific role.
     * 
     * @param role The role to check
     * @return true if the user has the role, false otherwise
     */
    public boolean hasRole(UserRole role) {
        return roles != null && roles.contains(role);
    }
}
