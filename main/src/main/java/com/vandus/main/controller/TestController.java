package com.vandus.main.controller;

import com.vandus.main.service.PythonAPIService;
import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UnableToSendOTPException;
import com.vandus.main.util.exception.UserAlreadyExistsException;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Hidden
@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private PythonAPIService pythonAPIService;

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
        return pythonAPIService.health();
    }

}