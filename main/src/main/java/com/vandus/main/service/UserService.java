package com.vandus.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vandus.main.model.User;
import com.vandus.main.repository.UserRepository;
import com.vandus.main.util.exception.UserNotFoundException;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public User getUserById(String id) {
        User user = userRepository
            .findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        user.setPassword(null);
        return user;
    }
}
