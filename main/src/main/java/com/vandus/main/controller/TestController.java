package com.vandus.main.controller;

import com.vandus.main.service.NLPService;
import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UnableToSendOTPException;
import com.vandus.main.util.exception.UserAlreadyExistsException;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@Hidden
@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private NLPService nlpService;

    @GetMapping("/public/test")
    public String test(HttpServletRequest request) {
        return "OK";
    }

    @PostMapping("/public/test")
    public String testPost(HttpServletRequest request) {
        return "OK";
    }

    @GetMapping("/private/test")
    public String testPrivate(HttpServletRequest request) {
        return "OK";
    }

    @GetMapping("/public/except")
    public String raiseException() {
        throw new RuntimeException("Exception raised");
    }

    @GetMapping("/public/InvalidEmail")
    public void InvalidEmailChecker() {
        throw new InvalidEmailPasswordException("Invalid Email Password");
    }

    @GetMapping("/public/WrongOTP")
    public void OTPChecker() {
        throw new UnableToSendOTPException("Unable to send OTP");
    }

    @GetMapping("/public/UserExists")
    public void UserChecker() {
        throw new UserAlreadyExistsException("User Already Exists");
    }

    @GetMapping("/public/python/health")
    public String healthTest() {
        return nlpService.checkHealth();
    }

}