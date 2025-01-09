package com.vandus.main.controller;

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
}