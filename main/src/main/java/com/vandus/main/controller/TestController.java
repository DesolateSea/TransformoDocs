package com.vandus.main.controller;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UnableToSendOTPException;
import com.vandus.main.util.exception.UserAlreadyExistsException;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

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
    public void InvalidEmailChecker() throws Exception {
        throw new InvalidEmailPasswordException("Invalid Email Password");
    }
    @GetMapping("public/WrongOTP")
    public void OTPChecker() throws Exception
    {
        throw new UnableToSendOTPException("Unable to send OTP");
    }
     @GetMapping("public/UserExists")
    public void UserChecker() throws Exception
     {
         throw new UserAlreadyExistsException("User Already Exists");
     }
}