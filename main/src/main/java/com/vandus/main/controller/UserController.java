package com.vandus.main.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vandus.main.model.User;
import com.vandus.main.service.UserService;
import com.vandus.main.util.JwtUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${vandus.api.private}/user")
@Tag(
    name="User API",
    description="API for user management for the client application"
)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @GetMapping("/")
    @Operation(
        summary="Get user info",
        description="Get user info for the current user logged in via JWT token in the cookie"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User info")
    })
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
