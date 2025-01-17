package com.vandus.main.security;

import com.vandus.main.util.JwtUtil;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import static java.util.Arrays.stream;

@Component
public class JwtAuthenticationFilter implements Filter {

    private String[] publicEndpoints = new String[] {
        "/api/public",
        "/api/auth",
        "/actuator"
    };

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Public API
        String requestURI = httpRequest.getRequestURI();
        if (stream(publicEndpoints).anyMatch(requestURI::startsWith)) {
            chain.doFilter(request, response);
            return;
        }

        // Private API
        String jwtToken = extractTokenFromRequest(httpRequest);
        if (jwtToken != null && jwtUtil.isTokenValid(jwtToken)) {
            chain.doFilter(request, response);
            return;
        }
        
        httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        // Check Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        // Check Cookies
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }
}
