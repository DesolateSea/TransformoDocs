package com.vandus.main.controller;

import com.vandus.main.service.AuthService;
import com.vandus.main.service.OTPService;
import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UserAlreadyExistsException;
import com.vandus.main.util.exception.UnableToSendOTPException;

import com.vandus.main.util.exception.UserNotFoundException;
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
    public ResponseEntity<Map<String, String>> signup(@RequestParam String email, @RequestParam String password) {
        try {
            authService.signup(email, password);

            otpService.sendOTP(email);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Signup successful. Please check your email for OTP.");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (UserAlreadyExistsException ex) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", ex.getMessage());

            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        } catch (UnableToSendOTPException ex) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", ex.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyEmail(@RequestParam String email, @RequestBody String otp) {
        try {
            boolean isValid = otpService.verifyOTP(email, otp);

            if (isValid) {
                authService.verifyEmail(email);
                otpService.deleteOTP("otp:"+email);
                Map<String, String> response = new HashMap<>();
                response.put("message", "OTP verified successfully");

                return ResponseEntity.ok(response);
            } else {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Invalid OTP");

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            }
        } catch (InvalidEmailPasswordException ex) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid email");

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
    

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String email, @RequestParam String password) {
        try {
            String token = authService.login(email, password);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (InvalidEmailPasswordException ex) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", ex.getMessage());

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
    @PostMapping("/forgetPassword")
    public ResponseEntity<Map<String, String>> forgetPassword(@RequestParam String email) {
        try{
            //Verify if user already exist
            if(authService.resetPasswordReq(email)){
                //otpSend for emailVerification
                otpService.sendRestRequestOTP(email);

                Map<String, String> response = new HashMap<>();
                response.put("message", "Reset password otp sent successfully");
                return ResponseEntity.ok(response);
            }else{
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Invalid email");

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
            }
        }catch (InvalidEmailPasswordException ex){
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid email");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
    @PostMapping("/verifyResetOtp")
    public ResponseEntity<Map<String, String>> verifyResetOtp(@RequestParam String email, @RequestParam String otp) {
        try{
            if(otpService.verifyOTPReset(email, otp)){
                if(otpService.deleteOTP("reset:"+email)){
                    Map<String, String> response = new HashMap<>();
                    String token = otpService.getConfirmPasswordToken(email);
                    response.put("message", "OTP reset successful");
                    response.put("AUTHENTICATION", token);
                    return ResponseEntity.ok(response);
                }else{
                    Map<String, String> errorResponse = new HashMap<>();
                    errorResponse.put("error", "Internal server error");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
                }
                
            }else{
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Invalid OTP");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        }catch(InvalidEmailPasswordException ex){
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid email");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
    @PostMapping("/setNewPassword")
    public ResponseEntity<Map<String, String>> setNewPassword(@RequestParam String email, @RequestParam String password,@RequestParam String token) {
        try{
            if(otpService.verifyResetToken(email,token)){
                boolean remove = otpService.deleteOTP("confirm:"+email);
                if(remove){
                    authService.resetPassword(email,password);
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "Reset password successful");
                    return ResponseEntity.ok(response);    
                }else{
                    Map<String, String> errorResponse = new HashMap<>();
                    errorResponse.put("error", "Internal server error");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
                }
            }else{
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Token is expired");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }
        }catch(InvalidEmailPasswordException ex){
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid email");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }catch(UserNotFoundException ex){
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}
