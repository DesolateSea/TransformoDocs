package com.vandus.main.controller;

import com.vandus.main.service.AuthService;
import com.vandus.main.service.OTPService;

import com.vandus.main.dto.SignupRequest;
import com.vandus.main.dto.LoginRequest;
import com.vandus.main.dto.OTPVerifyRequest;
import com.vandus.main.dto.AuthResponse;
import com.vandus.main.dto.MessageResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("${vandus.api.public}/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private OTPService otpService;

    @PostMapping("/signup")
    public ResponseEntity<MessageResponse> signup(@RequestBody SignupRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        authService.signup(email, password);
        otpService.sendOTP(email);

        MessageResponse response = new MessageResponse();
        response.setMessage("Signup successful. Please check your email for OTP.");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<MessageResponse> verifyEmail(@RequestBody OTPVerifyRequest request) {
        String email = request.getEmail();
        String otp = request.getOtp();

        otpService.verifyOTP(email, otp);
        authService.verifyEmail(email);
        
        MessageResponse response = new MessageResponse();
        response.setMessage("OTP verified successfully");

        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();
        
        String token = authService.login(email, password);

        AuthResponse response = new AuthResponse();
        response.setMessage("Login successful");
        response.setToken(token);

        return ResponseEntity.ok(response);
    }
}
