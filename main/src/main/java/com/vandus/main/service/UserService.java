package com.vandus.main.service;

import org.springframework.stereotype.Service;

import com.vandus.main.model.User;
import com.vandus.main.repository.UserRepository;
import com.vandus.main.util.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;

    public User getUserById(String id) {
        return userRepository
            .findByIdExcludePassword(id)
            .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
    }

    public User getUserByEmail(String email) {
        return userRepository
            .findByEmailExcludePassword(email)
            .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    }
}
