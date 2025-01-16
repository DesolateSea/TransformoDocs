package com.vandus.main.controller;

import com.vandus.main.dto.*;
import com.vandus.main.service.AuthService;
import com.vandus.main.service.OTPService;

import com.vandus.main.util.exception.UserNotFoundException;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.vandus.main.util.exception.*;

@RestController
@RequestMapping("${vandus.api.public}/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private OTPService otpService;

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> signup(@RequestBody @Valid SignupRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        authService.signup(email, password);
        otpService.sendOTP(email);

        MessageResponse response = new MessageResponse();
        response.setMessage("Signup successful. Please check your email for OTP.");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
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

    @PostMapping("/verify-email")
    public ResponseEntity<MessageResponse> verifyEmail(@RequestBody OTPVerifyRequest request) {
        String email = request.getEmail();
        String otp = request.getOtp();

        otpService.verifyOTP(email, otp);
        authService.verifyEmail(email);

        MessageResponse response = new MessageResponse();
        response.setMessage("OTP verified successfully");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<MessageResponse> forgetPassword(@RequestBody ForgetPasswordRequest request) {
        otpService.sendResetRequestOTP(request.getEmail());

        MessageResponse response = new MessageResponse();
        response.setMessage("Reset password OTP sent successfully");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-reset-otp")
    public ResponseEntity<AuthResponse> verifyResetPasswordOTP(@RequestBody OTPVerifyRequest req) {
        String email = req.getEmail();
        String otp = req.getOtp();
        
        otpService.verifyResetPasswordOTP(email, otp);

        String token = otpService.getConfirmPasswordToken(email);

        AuthResponse response = new AuthResponse();
        response.setMessage("OTP reset successful");
        response.setToken(token);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/update-password")
    public ResponseEntity<MessageResponse> updatePassword(@RequestBody ResetPasswordRequest req) {
        String email = req.getEmail();
        String password = req.getPassword();
        String token = req.getToken();

        otpService.verifyResetPasswordToken(email, token);
        authService.resetPassword(email, password);

        MessageResponse response = new MessageResponse();
        response.setMessage("Password is reset successfully");

        return ResponseEntity.ok(response);
    }
}
