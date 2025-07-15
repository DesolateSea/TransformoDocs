package com.vandus.main.controller;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("${vandus.api.auth}")
@Tag(
    name = "Security Configuration API"
)
public class SecurityController {

    @Value("${vandus.csrf.enabled}")
    private boolean csrfEnabled;

    @GetMapping("/_csrf")
    @Operation(
        summary = "Get CSRF token",
        description = "Get CSRF token for the client application"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "CSRF token"),
        @ApiResponse(responseCode = "403", description = "CSRF protection is disabled")
    })
    public ResponseEntity<?> getCsrfToken(HttpServletRequest request) {
        if (!csrfEnabled)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("CSRF protection is disabled");
        
        CsrfToken csrfToken = (CsrfToken) request.getAttribute("_csrf");
        return ResponseEntity.ok(csrfToken);
    }
}
