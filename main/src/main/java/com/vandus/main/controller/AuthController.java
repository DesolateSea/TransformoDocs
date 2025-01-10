package com.vandus.main.controller;

import com.vandus.main.service.AuthService;
import com.vandus.main.service.OTPService;

import com.vandus.main.dto.SignupRequest;
import com.vandus.main.dto.LoginRequest;
import com.vandus.main.dto.OTPVerifyRequest;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UserAlreadyExistsException;
import com.vandus.main.util.exception.UnableToSendOTPException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("${vandus.api.public}/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private OTPService otpService;

    @PostMapping("/signup")

    public ResponseEntity<Map<String, String>> signup(@RequestBody SignupRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

            authService.signup(email, password);

            otpService.sendOTP(email);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Signup successful. Please check your email for OTP.");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyEmail(@RequestBody OTPVerifyRequest request) {
        String email = request.getEmail();
        String otp = request.getOtp();

            boolean isValid = otpService.verifyOTP(email, otp);

            if (isValid) {
                authService.verifyEmail(email);
                
                Map<String, String> response = new HashMap<>();
                response.put("message", "OTP verified successfully");

                return ResponseEntity.ok(response);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Invalid OTP");

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            }   
    }
    

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();
        
            String token = authService.login(email, password);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);

            return ResponseEntity.ok(response);
    }
}
