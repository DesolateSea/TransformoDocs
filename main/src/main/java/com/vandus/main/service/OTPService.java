package com.vandus.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.util.Random;

@Service
public class OTPService {
    
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Value("${spring.mail.username}")
    private String mailUsername;

    public void sendOTP(String email) {
        String otpKey = "otp:" + email;
        String otp = generateRandomOTP();
        redisTemplate.opsForValue().set(otpKey, otp);
        sendOTPMail(email, otp);
    }

    private String generateRandomOTP() {
        return String.valueOf(Math.abs(new Random().nextInt()));
    }

    private void sendOTPMail(String email, String otp) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            message.setFrom(mailUsername);
            message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
            message.setSubject("OTP");
            message.setText("OTP: " + otp);
            mailSender.send(message);
        } catch (MessagingException e) {
            System.out.println("Error while sending email: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
}
