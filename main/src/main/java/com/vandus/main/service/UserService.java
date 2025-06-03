package com.vandus.main.service;

import org.springframework.stereotype.Service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.vandus.main.model.User;
import com.vandus.main.repository.UserRepository;
import com.vandus.main.util.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

/**
 * Service for managing user-related operations.
 * Provides methods for retrieving user information and managing user data.
 */
@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;

    /**
     * Retrieves a user by their unique identifier.
     * 
     * @param id The unique identifier of the user
     * @return The User entity with the specified ID (with password excluded)
     * @throws UserNotFoundException If no user with the specified ID exists
     */
    public User getUserById(String id) {
        return userRepository
            .findByIdExcludePassword(id)
            .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    /**
     * Retrieves a user by their email address.
     * 
     * @param email The email address of the user
     * @return The User entity with the specified email (with password excluded)
     * @throws UserNotFoundException If no user with the specified email exists
     */
    public User getUserByEmail(String email) {
        return userRepository
            .findByEmailExcludePassword(email)
            .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    }

    /**
     * Retrieves the currently authenticated user from the security context.
     * 
     * @return The User entity of the currently authenticated user, or null if no user is authenticated
     */
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            return getUserByEmail(email);
        }
        
        return null;
    }
}
