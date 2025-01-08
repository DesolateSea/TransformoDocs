package com.vandus.main.security;

import com.vandus.main.util.JwtUtil;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@Component
public class JWTAuthFilter implements Filter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Public API
        if (httpRequest.getRequestURI().startsWith("/api/public")) {
            chain.doFilter(request, response);
            return;
        }

        // Private API
        String authHeader = httpRequest.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwtToken = authHeader.substring(7);
            if (jwtUtil.isTokenValid(jwtToken)) {
                chain.doFilter(request, response);
                return;
            }
        }

        httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
    }
}
