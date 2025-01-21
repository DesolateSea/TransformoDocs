package com.vandus.main.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vandus.main.model.User;
import com.vandus.main.service.UserService;
import com.vandus.main.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${vandus.api.private}/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @GetMapping("/")
    public User getUser(HttpServletRequest request) {
        String token = jwtUtil.extractTokenFromRequest(request);
        String email = jwtUtil.getEmail(token);
        return userService.getUserByEmail(email);
    }
    
    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") String id) {
        return userService.getUserById(id);
    }
}
