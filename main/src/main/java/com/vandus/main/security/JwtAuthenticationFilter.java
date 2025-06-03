package com.vandus.main.security;

import com.vandus.main.util.JwtUtil;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;
import static java.util.Arrays.stream;

// TODO: Use role-based access control instead of public/private endpoints

@Component
public class JwtAuthenticationFilter implements Filter {

    private String[] publicEndpoints = new String[] {
        "/api/public",
        "/api/auth",
        "/actuator", // Spring Boot Actuator
        "/swagger-ui", // Springdoc Swagger UI
        "/api-docs", // Springdoc OpenAPI Docs
    };

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void doFilter (
            ServletRequest request, 
            ServletResponse response, 
            FilterChain chain
        ) throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        if (handlePublicEndpoint(httpRequest, httpResponse, chain))
            return;

        if (handlePrivateEndpoint(httpRequest, httpResponse, chain))
            return;

        httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT Token");
    }

    /**
     * Handles public endpoints by allowing access without authentication.
     *
     * @return true if the request was handled, false otherwise
     */
    private boolean handlePublicEndpoint(
            HttpServletRequest request, 
            HttpServletResponse response, 
            FilterChain chain
        ) throws IOException, ServletException {

        String requestURI = request.getRequestURI();

        if (stream(publicEndpoints).anyMatch(requestURI::startsWith)) {
            chain.doFilter(request, response);
            return true;
        }

        return false;
    }

    /**
     * Handles private endpoints by requiring authentication.
     *
     * @return true if the request was handled, false otherwise
     */
    private boolean handlePrivateEndpoint(
            HttpServletRequest request, 
            HttpServletResponse response, 
            FilterChain chain
        ) throws IOException, ServletException {

        String jwtToken = jwtUtil.extractTokenFromRequest(request);
        
        if (jwtToken != null && jwtUtil.isTokenValid(jwtToken)) {

            String email = jwtUtil.getEmail(jwtToken);

            UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(
                    email, 
                    null, 
                    List.of() // no roles as of now
                );

            SecurityContextHolder
                .getContext()
                .setAuthentication(auth);

            chain.doFilter(request, response);
            return true;
        }

        return false;
    }
}