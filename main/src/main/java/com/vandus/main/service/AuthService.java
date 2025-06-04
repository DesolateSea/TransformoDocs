package com.vandus.main.service;

import com.vandus.main.model.User;
import com.vandus.main.repository.UserRepository;
import com.vandus.main.util.JwtUtil;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UserAlreadyExistsException;
import com.vandus.main.util.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
     * Registers a new temporary user in the system with an email and password.
     * If a user with the same email exists but is not verified, the existing user data is deleted.
     * It is advised to use a scheduled task to periodically remove unverified users.
     * This system is not intended to provide services to unverified users.
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
     * Authenticates a user and generates a JWT token if successful. Fails if email is unverified or password doesn't match.
     *
     * @param email The email address of the user
     * @param password The password to validate
     * @return A JWT token string for authenticated users
     * @throws InvalidEmailPasswordException If the email doesn't exist or is unverified or the password doesn't match
     */
    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new InvalidEmailPasswordException("Invalid email or password"));

        if (!user.isEmailVerified())
            throw new InvalidEmailPasswordException("Email not verified");
        
        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new InvalidEmailPasswordException("Password does not match");

        return jwtUtil.generateToken(email);
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
