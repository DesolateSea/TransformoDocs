package com.vandus.main.service;

import com.vandus.main.repository.UserRepository;
import com.vandus.main.util.MailSenderUtil;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.InvalidOTPException;

import lombok.RequiredArgsConstructor;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.concurrent.TimeUnit;
import java.util.Base64;

/**
 * Service for handling One-Time Password (OTP) operations.
 * Manages the generation, sending, and verification of OTPs for email verification
 * and password reset flows. Uses Redis for temporary OTP storage.
 */
@Service
@RequiredArgsConstructor
public class OTPService {

    private final UserRepository userRepository;
    private final MailSenderUtil mailSender;
    private final StringRedisTemplate redisTemplate;

    private final SecureRandom rng = new SecureRandom();

    /**
     * Generates and sends an OTP for email verification.
     * The OTP is stored in Redis with a 5-minute expiry.
     * 
     * @param email The email address to send the OTP to
     * @throws InvalidEmailPasswordException If the email doesn't belong to a registered user
     */
    public void sendOTP(String email) {
        if (!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");

        String otpKey = "otp:" + email;
        String otp = generateRandomOTP();
        redisTemplate.opsForValue().set(otpKey, otp, 5, TimeUnit.MINUTES);

        System.out.println("\n\033[1;33m[LOG]\033[0m SIGNUP \033[1;34m" + email + "\033[0m with OTP \033[1;32m" + otp + "\033[0m\n");
        mailSender.sendVerifyEmailOTPMail(email, otp);
    }

    /**
     * Generates and sends an OTP for password reset requests.
     * The OTP is stored in Redis with a 5-minute expiry.
     * 
     * @param email The email address to send the password reset OTP to
     * @throws InvalidEmailPasswordException If the email doesn't belong to a registered user
     */
    public void sendResetRequestOTP(String email) {
        if (!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");

        String otpKey = "reset:" + email;
        String otp = generateRandomOTP();
        redisTemplate.opsForValue().set(otpKey, otp, 5, TimeUnit.MINUTES);

        System.out.println("\n\033[1;33m[LOG]\033[0m Forget \033[1;34m" + email + "\033[0m with OTP \033[1;32m" + otp + "\033[0m\n");
        mailSender.sendResetPasswordOTPMail(email, otp);
    }

    /**
     * Verifies the OTP for email verification.
     * 
     * @param email The email address associated with the OTP
     * @param otp The OTP to verify
     * @throws InvalidEmailPasswordException If the email doesn't belong to a registered user
     * @throws InvalidOTPException If the OTP is invalid or expired
     */
    public void verifyOTP(String email, String otp) {
        if (!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");

        String otpKey = "otp:" + email;
        if (!otp.equals(redisTemplate.opsForValue().get(otpKey)))
            throw new InvalidOTPException("Invalid OTP");

        redisTemplate.delete(otpKey);
    }

    /**
     * Verifies the OTP for password reset requests.
     * 
     * @param email The email address associated with the reset request
     * @param otp The OTP to verify
     * @throws InvalidEmailPasswordException If the email doesn't belong to a registered user
     * @throws InvalidOTPException If the OTP is invalid or expired
     */
    public void verifyResetPasswordOTP(String email, String otp) {
        if (!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");

        String otpKey = "reset:" + email;
        if (!otp.equals(redisTemplate.opsForValue().get(otpKey)))
            throw new InvalidOTPException("Invalid OTP");

        redisTemplate.delete(otpKey);
    }

    /**
     * Generates a secure token for password confirmation.
     * The token is stored in Redis with a 10-minute expiry.
     * 
     * @param email The email address associated with the password reset
     * @return A secure random token for password reset confirmation
     */
    public String getConfirmPasswordToken(String email) {
        String otpKey = "confirm:" + email;
        String verificationKey = generateRandomString();

        redisTemplate.opsForValue().set(otpKey, verificationKey, 10, TimeUnit.MINUTES);

        return verificationKey;
    }

    /**
     * Verifies the token for password reset confirmation.
     * 
     * @param email The email address associated with the password reset
     * @param otp The token to verify
     * @throws InvalidEmailPasswordException If the email doesn't belong to a registered user
     * @throws InvalidOTPException If the token is invalid or expired
     */
    public void verifyResetPasswordToken(String email, String otp) {
        if (!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");

        String otpKey = "confirm:" + email;
        if (!otp.equals(redisTemplate.opsForValue().get(otpKey)))
            throw new InvalidOTPException("Invalid token");

        redisTemplate.delete(otpKey);
    }

    /**
     * Generates a random 6-digit OTP.
     * 
     * @return A 6-digit numeric OTP as a string
     */
    private String generateRandomOTP() {
        int otp = 100000 + rng.nextInt(900000);
        return String.valueOf(otp);
    }

    /**
     * Generates a secure random string for use as a token.
     * 
     * @return A URL-safe Base64 encoded random string
     */
    private String generateRandomString() {
        byte[] randomBytes = new byte[48];
        rng.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }
}
