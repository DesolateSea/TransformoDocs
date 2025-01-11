package com.vandus.main.controller;

import com.vandus.main.service.AuthService;
import com.vandus.main.service.OTPService;

import com.vandus.main.dto.SignupRequest;
import com.vandus.main.dto.LoginRequest;
import com.vandus.main.dto.OTPVerifyRequest;
import com.vandus.main.dto.ResetPasswordReq;
import com.vandus.main.dto.ErrorResponse;
import com.vandus.main.dto.AuthResponse;
import com.vandus.main.dto.MessageResponse;

import com.vandus.main.util.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.vandus.main.util.exception.*;
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
    @PostMapping("/forgetPassword")
    public ResponseEntity<?> forgetPassword(@RequestBody String email) {
        try{
            //Verify if user already exist
            if(authService.resetPasswordReq(email)){
                //otpSend for emailVerification
                otpService.sendRestRequestOTP(email);
                AuthResponse response = new AuthResponse();
                response.setMessage("Reset password otp sent successfully");
                return ResponseEntity.ok(response);
            }else{
                ErrorResponse errorResponse = new ErrorResponse();
                errorResponse.setError("Invalid Email");

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            }
        }catch (InvalidEmailPasswordException ex){
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setError("Invalid email");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
    @PostMapping("/verifyResetOtp")
    public ResponseEntity<?> verifyResetOtp(@RequestBody OTPVerifyRequest req) {
        String email = req.getEmail();
        String otp = req.getOtp();
        try{
            if(otpService.verifyOTPReset(email, otp)){
                if(otpService.deleteOTP("reset:"+email)){
                    AuthResponse response = new AuthResponse();
                    String token = otpService.getConfirmPasswordToken(email);
                    response.setMessage("OTP reset successful");
                    response.setToken(token);
                    return ResponseEntity.ok(response);
                }else{
                    ErrorResponse errorResponse = new ErrorResponse();
                    errorResponse.setError("Internal server error");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
                }

            }else{
                ErrorResponse errorResponse = new ErrorResponse();
                errorResponse.setError("Invalid OTP");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        }catch(InvalidEmailPasswordException ex){
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setError("Invalid email");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
    @PostMapping("/setNewPassword")
    public ResponseEntity<?> setNewPassword(@RequestBody ResetPasswordReq req ) {
        String email = req.getEmail();
        String password = req.getPassword();
        String token = req.getToken();
        try{
            if(otpService.verifyResetToken(email,token)){
                boolean remove = otpService.deleteOTP("confirm:"+email);
                if(remove){
                    authService.resetPassword(email,password);
                    AuthResponse response = new AuthResponse();
                    response.setMessage("Password is reset successfully");
                    return ResponseEntity.ok(response);
                }else{
                    ErrorResponse errorResponse = new ErrorResponse();
                    errorResponse.setError("Internal server error");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
                }
            }else{
                ErrorResponse errorResponse = new ErrorResponse();
                errorResponse.setError("Token is expired");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        }catch(InvalidEmailPasswordException ex){
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setError("Invalid email");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }catch(UserNotFoundException ex){
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setError("User Not Found");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
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
