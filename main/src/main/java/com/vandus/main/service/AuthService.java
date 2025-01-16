package com.vandus.main.service;

import com.vandus.main.model.User;
import com.vandus.main.repository.UserRepository;
import com.vandus.main.util.JwtUtil;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UserAlreadyExistsException;
import com.vandus.main.util.exception.UserNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public void signup(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user != null && user.isEmailVerified())
            throw new UserAlreadyExistsException("User with email " + email + " already exists");
        
        String hashedPassword = passwordEncoder.encode(password);

        if (user != null)
            user.setPassword(hashedPassword);
        else 
            user = new User(email, hashedPassword);

        userRepository.save(user);
    }

    public void verifyEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidEmailPasswordException("Invalid email"));

        user.setEmailVerified(true);

        userRepository.save(user);
    }

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidEmailPasswordException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new InvalidEmailPasswordException("Invalid email or password");

        return jwtUtil.generateToken(email);
    }

    public void resetPassword(String email, String password) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }
}
