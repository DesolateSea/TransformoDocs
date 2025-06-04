package com.vandus.main.service;

import com.vandus.main.model.User;
import com.vandus.main.model.UserRole;
import com.vandus.main.repository.UserRepository;
import com.vandus.main.util.JwtUtil;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UserAlreadyExistsException;
import com.vandus.main.util.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import static java.util.stream.Collectors.toList;

/**
 * Service class handling authentication operations such as user signup, login,
 * email verification, and password reset.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /**
     * Registers a new user in the system with an email and password.
     * If a user with the same email exists but is not verified, the existing user will be deleted first.
     *
     * @param email The email address for the new user
     * @param password The password for the new user (will be encoded)
     * @throws UserAlreadyExistsException If a user with the given email already exists and is verified
     */
    public void signup(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user != null && user.isEmailVerified())
            throw new UserAlreadyExistsException("User with email " + email + " already exists");
        
        String hashedPassword = passwordEncoder.encode(password);

        if (user != null)
            userRepository.delete(user); // Remove leftover data from previous signup attempts
        user = new User(email, hashedPassword);

        userRepository.save(user);
    }

    /**
     * Marks a user's email as verified in the system.
     *
     * @param email The email address to verify
     * @throws InvalidEmailPasswordException If no user is found with the given email
     */
    public void verifyEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidEmailPasswordException("Invalid email"));

        user.setEmailVerified(true);

        userRepository.save(user);
    }

    /**
     * Authenticates a user and generates a JWT token if successful.
     *
     * @param email The email address of the user
     * @param password The password to validate
     * @return A JWT token string for authenticated users
     * @throws InvalidEmailPasswordException If the email doesn't exist or the password doesn't match
     */
    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidEmailPasswordException("Invalid email or password"));

        if (!user.isEmailVerified())
            throw new InvalidEmailPasswordException("Email not verified");
        
        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new InvalidEmailPasswordException("Invalid email or password");

        List<String> roles = user.getRoles().stream()
                .map(UserRole::name)
                .collect(toList());

        return jwtUtil.generateToken(email, roles);
    }

    /**
     * Resets a user's password.
     *
     * @param email The email address of the user
     * @param password The new password to set (will be encoded)
     * @throws UserNotFoundException If no user is found with the given email or unverified email
     */
    public void resetPassword(String email, String password) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException("User not found"));
        
        if (!user.isEmailVerified())
            throw new UserNotFoundException("User not found");
        
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }
}
