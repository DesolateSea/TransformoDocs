package com.vandus.main.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CookieUtil {
    
    @Value("${vandus.jwt.cookie.name}")
    private String jwtCookieName;

    @Value("${vandus.jwt.cookie.max-age}")
    private int jwtCookieMaxAge;

    @Value("${vandus.jwt.cookie.secure}")
    private boolean jwtCookieHTTPS;

    public void setJwtCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie(jwtCookieName, token);
        cookie.setMaxAge(jwtCookieMaxAge);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(jwtCookieHTTPS);

        response.addCookie(cookie);
    }

    public void clearJwtCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(jwtCookieName, "");
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(jwtCookieHTTPS);

        response.addCookie(cookie);
    }
}
