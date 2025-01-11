package com.vandus.main.service;

import com.vandus.main.repository.UserRepository;

import static com.vandus.main.util.Messages.OTPMessage.createVerificationEmail;
import static com.vandus.main.util.Messages.OTPMessage.createForgotPasswordEmail;
import com.vandus.main.util.exception.InvalidEmailPasswordException;
import com.vandus.main.util.exception.UnableToSendOTPException;
import com.vandus.main.util.exception.InvalidOTPException;

import jakarta.mail.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.security.SecureRandom;
import java.util.concurrent.TimeUnit;

import java.security.SecureRandom;
import java.util.Base64;

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
        
        System.out.println("\n\033[1;33m[LOG]\033[0m SIGNUP \033[1;34m" + email + "\033[0m with OTP \033[1;32m" + otp + "\033[0m\n");
        sendOTPMail(email, otp);
    }
    public void sendRestRequestOTP(String email) {
        if(!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");
        String otpKey = "reset:" + email;
        String otp = generateRandomOTP();
        redisTemplate.opsForValue().set(otpKey, otp, 5, TimeUnit.MINUTES);
        System.out.println("\n\033[1;33m[LOG]\033[0m Forget \033[1;34m" + email + "\033[0m with OTP \033[1;32m" + otp + "\033[0m\n");
        sendOTPMailForget(email, otp);
    }
    public void verifyOTP(String email, String otp) {
        if (!userRepository.findByEmail(email).isPresent())
            throw new InvalidEmailPasswordException("Invalid email");

        String otpKey = "otp:" + email;
        if (!otp.equals(redisTemplate.opsForValue().get(otpKey)))
            throw new InvalidOTPException("Invalid OTP");

        redisTemplate.delete(otpKey);
    }

    private String generateRandomOTP() {
        SecureRandom rng = new SecureRandom();
        int otp = 100000 + rng.nextInt(900000);
        return String.valueOf(otp);
    }
    private String generateRandomString() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomBytes = new byte[48]; // 48 bytes = 64 characters after Base64 encoding
        secureRandom.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    private void sendOTPMail(String email, String otp) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            message.setFrom();
            message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
            message.setSubject(otp + " is OTP to sign up to TransformoDocs");
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
    private void sendOTPMailForget(String email,String otp){
        MimeMessage message = mailSender.createMimeMessage();

        try{
            message.setFrom();
            message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
            message.setSubject(otp+" is your OTP to reset your password");
            message.setContent(createForgotPasswordEmail(otp),"text/html");

            try{
                mailSender.send(message);
            }catch(MailSendException e){
                throw new UnableToSendOTPException("Unable to send OTP email");
            }
        }catch(MessagingException e){
            System.out.println("Error while sending email: " + e.getMessage());
            e.printStackTrace();
        }
    }
    public boolean verifyOTPReset(String email, String otp) {
        if(!userRepository.findByEmail(email).isPresent()){
            throw new InvalidEmailPasswordException("Invalid email");
        }
        String otpKey = "reset:" + email;
        return otp.equals(redisTemplate.opsForValue().get(otpKey));
    }
    public String getConfirmPasswordToken(String email) {
        String otpKey = "confirm:" + email;
        String verificationKey = generateRandomString();
        redisTemplate.opsForValue().set(otpKey, verificationKey, 10, TimeUnit.MINUTES);
        return verificationKey;
    }
    public boolean verifyResetToken(String email, String otp) {
        if(!userRepository.findByEmail(email).isPresent()){
            throw new InvalidEmailPasswordException("Invalid email");
        }
        String otpKey = "confirm:" + email;
        return otp.equals(redisTemplate.opsForValue().get(otpKey));
    }public boolean deleteOTP(String otpKey){
        return redisTemplate.delete(otpKey);
    }
}
