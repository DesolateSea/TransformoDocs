package com.vandus.main.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class OTPVerifyRequest {
    protected String email;
    protected String otp;
}
