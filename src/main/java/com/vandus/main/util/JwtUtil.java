package com.vandus.main.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.WeakKeyException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class JwtUtil {
    private final String secret;

    @Value("${vandus.jwt.expiration}")
    private long expiration;

    public JwtUtil(@Value("${vandus.jwt.secret}") String secret) {
        if (secret.length() < 32) {
            throw new WeakKeyException("JWT secret must be at least 32 characters long");
        }
        this.secret = secret;
    }

    /**
     * Generates a JWT token for a user with default USER role
     *
     * @param email User's email address
     * @return JWT token string
     */
    public String generateToken(String email) {
        return generateToken(email, List.of("USER"));
    }

    /**
     * Generates a JWT token for a user with specified roles
     *
     * @param email User's email address
     * @param roles Collection of role strings
     * @return JWT token string
     */
    public String generateToken(String email, Collection<String> roles) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roles);
        
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts the email from a JWT token
     *
     * @param token JWT token string
     * @return Email address
     */
    public String getEmail(String token) {
        return getClaims(token).getSubject();
    }

    /**
     * Extracts the roles from a JWT token
     *
     * @param token JWT token string
     * @return List of role strings
     */
    @SuppressWarnings("unchecked")
    public List<String> getRoles(String token) {
        return (List<String>) getClaims(token).get("roles");
    }

    /**
     * Checks if a JWT token is valid (not expired)
     *
     * @param token JWT token string
     * @return true if token is valid, false otherwise
     */
    public boolean isTokenValid(String token) {
        return !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(secret.getBytes()).build().parseClaimsJws(token).getBody();
    }
    
    /**
     * Extracts the JWT token from the Authorization header or Cookies
     *
     * @param request HTTP request
     * @return JWT token string
     */
    public String extractTokenFromRequest(HttpServletRequest request) {
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
