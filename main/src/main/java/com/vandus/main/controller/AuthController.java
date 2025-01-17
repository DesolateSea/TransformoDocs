package com.vandus.main.controller;

import com.vandus.main.dto.*;
import com.vandus.main.service.AuthService;
import com.vandus.main.service.OTPService;
import com.vandus.main.util.CookieUtil;

import com.vandus.main.util.exception.UserNotFoundException;

import com.vandus.main.dto.SignupRequest;
import com.vandus.main.dto.LoginRequest;
import com.vandus.main.dto.OTPVerifyRequest;
import com.vandus.main.dto.ResetPasswordRequest;
import com.vandus.main.dto.AuthResponse;
import com.vandus.main.dto.MessageResponse;
import com.vandus.main.dto.ForgetPasswordRequest;

import jakarta.validation.Valid;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("${vandus.api.auth}")
@Tag(
    name="User Authentication API",
    description="API for user authentication for the client application"
)
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private OTPService otpService;

    @Autowired
    private CookieUtil cookieUtil;


    @PostMapping("/register")
    @Operation(
        summary="Register a new user",
        description="Register a new user with email and password, sends an OTP to the user's email for verification"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "User registered successfully"),
    })
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
    @Operation(
        summary="Login a user",
        description="Login a user with email and password, upon successful login, a JWT token is set in cookie and returned in response"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login successful")
    })
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        String email = request.getEmail();
        String password = request.getPassword();

        String token = authService.login(email, password);

        cookieUtil.setJwtCookie(response, token);

        AuthResponse responseObj = new AuthResponse();
        responseObj.setMessage("Login successful");
        responseObj.setToken(token);

        return ResponseEntity.ok(responseObj);
    }


    @PostMapping("/logout")
    @Operation(
        summary="Logout a user",
        description="Logout a user by clearing the JWT cookie"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Logout successful")
    })
    public ResponseEntity<MessageResponse> logout(HttpServletRequest request, HttpServletResponse response) {
        cookieUtil.clearJwtCookie(response);

        MessageResponse responseObj = new MessageResponse();
        responseObj.setMessage("Logged out successfully");

        return ResponseEntity.ok(responseObj);
    }


    @PostMapping("/verify-email-otp")
    @Operation(
        summary="Verify email OTP",
        description="Verify OTP sent to user's email for email verification during registration"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "OTP verified successfully")
    })
    public ResponseEntity<MessageResponse> verifyEmailOtp(@RequestBody OTPVerifyRequest request) {
        String email = request.getEmail();
        String otp = request.getOtp();

        otpService.verifyOTP(email, otp);
        authService.verifyEmail(email);

        MessageResponse response = new MessageResponse();
        response.setMessage("OTP verified successfully");

        return ResponseEntity.ok(response);
    }


    @PostMapping("/forgot-password")
<<<<<<< HEAD
    public ResponseEntity<MessageResponse> forgetPassword(@RequestBody ForgetPasswordRequest request) {
        otpService.sendResetRequestOTP(request.getEmail());
=======
    @Operation(
        summary="Send reset password OTP",
        description="Send reset password OTP to user's email for password reset"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Reset password OTP sent successfully")
    })
    public ResponseEntity<MessageResponse> forgetPassword(@RequestBody String email) {
        otpService.sendResetRequestOTP(email);
>>>>>>> 71da6b2cafae665b6d72620efdf92f292c427310

        MessageResponse response = new MessageResponse();
        response.setMessage("Reset password OTP sent successfully");

        return ResponseEntity.ok(response);
    }


    @PostMapping("/verify-reset-otp")
    @Operation(
        summary="Verify reset password OTP",
        description="Verify reset password OTP sent to user's email for password reset"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "OTP reset successful")
    })
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
    @Operation(
        summary="Update password",
        description="Update password for a user with a reset password OTP"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Password is reset successfully")
    })
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
