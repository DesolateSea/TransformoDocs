package com.vandus.main.controller;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${vandus.api.public}/auth")
public class SecurityController {

    @Value("${vandus.csrf.enabled}")
    private boolean csrfEnabled;

    @GetMapping("/_csrf")
    public ResponseEntity<?> getCsrfToken(HttpServletRequest request) {
        if (!csrfEnabled)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("CSRF protection is disabled");
        
        CsrfToken csrfToken = (CsrfToken) request.getAttribute("_csrf");
        return ResponseEntity.ok(csrfToken);
    }
}
