package com.vandus.main.service;

import com.vandus.main.repository.UserRepository;
import com.vandus.main.util.MailSenderUtil;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.InvalidOTPException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.concurrent.TimeUnit;
import java.util.Base64;

@Service
public class OTPService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailSenderUtil mailSender;

    @Autowired
    private StringRedisTemplate redisTemplate;

    private final SecureRandom rng = new SecureRandom();

    public void sendOTP(String email) {
        if (!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");

        String otpKey = "otp:" + email;
        String otp = generateRandomOTP();
        redisTemplate.opsForValue().set(otpKey, otp, 5, TimeUnit.MINUTES);

        System.out.println("\n\033[1;33m[LOG]\033[0m SIGNUP \033[1;34m" + email + "\033[0m with OTP \033[1;32m" + otp + "\033[0m\n");
        mailSender.sendVerifyEmailOTPMail(email, otp);
    }

    public void sendResetRequestOTP(String email) {
        if (!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");

        String otpKey = "reset:" + email;
        String otp = generateRandomOTP();
        redisTemplate.opsForValue().set(otpKey, otp, 5, TimeUnit.MINUTES);

        System.out.println("\n\033[1;33m[LOG]\033[0m Forget \033[1;34m" + email + "\033[0m with OTP \033[1;32m" + otp + "\033[0m\n");
        mailSender.sendResetPasswordOTPMail(email, otp);
    }

    public void verifyOTP(String email, String otp) {
        if (!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");

        String otpKey = "otp:" + email;
        if (!otp.equals(redisTemplate.opsForValue().get(otpKey)))
            throw new InvalidOTPException("Invalid OTP");

        redisTemplate.delete(otpKey);
    }

    public void verifyResetPasswordOTP(String email, String otp) {
        if (!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");

        String otpKey = "reset:" + email;
        if (!otp.equals(redisTemplate.opsForValue().get(otpKey)))
            throw new InvalidOTPException("Invalid OTP");

        redisTemplate.delete(otpKey);
    }

    public String getConfirmPasswordToken(String email) {
        String otpKey = "confirm:" + email;
        String verificationKey = generateRandomString();

        redisTemplate.opsForValue().set(otpKey, verificationKey, 10, TimeUnit.MINUTES);

        return verificationKey;
    }

    public void verifyResetPasswordToken(String email, String otp) {
        if (!userRepository.findByEmail(email).isPresent()) {
            throw new InvalidEmailPasswordException("Invalid email");
        }

        String otpKey = "confirm:" + email;
        if (!otp.equals(redisTemplate.opsForValue().get(otpKey)))
            throw new InvalidOTPException("Invalid token");

        redisTemplate.delete(otpKey);
    }

    private String generateRandomOTP() {
        int otp = 100000 + rng.nextInt(900000);
        return String.valueOf(otp);
    }

    private String generateRandomString() {
        byte[] randomBytes = new byte[48];
        rng.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }
}
