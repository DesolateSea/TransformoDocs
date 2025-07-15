package com.vandus.main.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import lombok.Setter;
import lombok.NoArgsConstructor;

@Setter @NoArgsConstructor
public class SignupRequest {
    protected String email;
    protected String password;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    public String getEmail() {
        return email;
    }

    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", 
        message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and must be at least 8 characters long"
    )
    public String getPassword() {
        return password;
    }
}
