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
        String jwtToken = jwtUtil.extractTokenFromRequest(httpRequest);
        if (jwtToken != null && jwtUtil.isTokenValid(jwtToken)) {
            chain.doFilter(request, response);
            return;
        }
        
        httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
    }
}
