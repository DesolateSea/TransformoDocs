package com.vandus.main.service;

import com.vandus.main.repository.UserRepository;
import static com.vandus.main.util.messages.OTPMessage.createVerificationEmail;

import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UnableToSendOTPException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class OTPService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private StringRedisTemplate redisTemplate;

    public void sendOTP(String email) {
        if (!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");

        
        String otpKey = "otp:" + email;
        String otp = generateRandomOTP();
        redisTemplate.opsForValue().set(otpKey, otp, 5, TimeUnit.MINUTES);
        sendOTPMail(email, otp);
    }

    public boolean verifyOTP(String email, String otp) {
        if (!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");

        String otpKey = "otp:" + email;
        return otp.equals(redisTemplate.opsForValue().get(otpKey));
    }

    private String generateRandomOTP() {
        return String.valueOf(Math.abs(new Random().nextInt()));
    }

    private void sendOTPMail(String email, String otp) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            message.setFrom();
            message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
            message.setSubject("OTP");
            message.setContent(createVerificationEmail(otp), "text/html");

            try {
                mailSender.send(message);
            } catch (MailSendException e) {
                throw new UnableToSendOTPException("Unable to send OTP email");
            }
        } catch (MessagingException e) {
            System.out.println("Error while sending email: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
}
