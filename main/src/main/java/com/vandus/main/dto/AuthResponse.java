package com.vandus.main.dto;

public class AuthResponse extends MessageResponse {
    public String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
