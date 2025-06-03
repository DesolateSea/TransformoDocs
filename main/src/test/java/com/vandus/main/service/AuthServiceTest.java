package com.vandus.main.service;

import com.vandus.main.model.User;
import com.vandus.main.repository.UserRepository;
import com.vandus.main.util.JwtUtil;
import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UserAlreadyExistsException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    private User mockUser;
    private final String email = "test@example.com";
    private final String password = "password";
    private final String hashedPassword = "hashedPassword";

    @BeforeEach
    void setUp() {
        mockUser = new User(email, hashedPassword);
    }

    @Test
    void signup_NewUser_Success() {
        // Arrange
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        when(passwordEncoder.encode(password)).thenReturn(hashedPassword);
        
        // Act
        authService.signup(email, password);
        
        // Assert
        verify(userRepository).save(any(User.class));
    }

    @Test
    void signup_UserExistsAndVerified_ThrowsException() {
        // Arrange
        mockUser.setEmailVerified(true);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));
        
        // Act & Assert
        assertThrows(UserAlreadyExistsException.class, () -> {
            authService.signup(email, password);
        });
        
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void signup_UserExistsButNotVerified_UpdatesPassword() {
        // Arrange
        mockUser.setEmailVerified(false);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.encode(password)).thenReturn(hashedPassword);
        
        // Act
        authService.signup(email, password);
        
        // Assert
        verify(userRepository).save(mockUser);
        assertEquals(hashedPassword, mockUser.getPassword());
    }

    @Test
    void verifyEmail_Success() {
        // Arrange
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));
        
        // Act
        authService.verifyEmail(email);
        
        // Assert
        verify(userRepository).save(mockUser);
        assertTrue(mockUser.isEmailVerified());
    }

    @Test
    void verifyEmail_UserNotFound_ThrowsException() {
        // Arrange
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        
        // Act & Assert
        assertThrows(InvalidEmailPasswordException.class, () -> {
            authService.verifyEmail(email);
        });
        
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void login_Success() {
        // Arrange
        mockUser.setEmailVerified(true);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches(password, hashedPassword)).thenReturn(true);
        when(jwtUtil.generateToken(email)).thenReturn("jwt-token");
        
        // Act
        String token = authService.login(email, password);
        
        // Assert
        assertNotNull(token);
        assertEquals("jwt-token", token);
    }

    @Test
    void login_InvalidEmail_ThrowsException() {
        // Arrange
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        
        // Act & Assert
        assertThrows(InvalidEmailPasswordException.class, () -> {
            authService.login(email, password);
        });
    }

    @Test
    void login_InvalidPassword_ThrowsException() {
        // Arrange
        mockUser.setEmailVerified(true);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches(password, hashedPassword)).thenReturn(false);
        
        // Act & Assert
        assertThrows(InvalidEmailPasswordException.class, () -> {
            authService.login(email, password);
        });
    }
}
