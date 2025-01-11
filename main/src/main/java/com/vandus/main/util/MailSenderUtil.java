package com.vandus.main.util;

import static com.vandus.main.util.messages.OTPMessage.createVerificationEmail;
import static com.vandus.main.util.messages.OTPMessage.createForgotPasswordEmail;

import com.vandus.main.util.exception.UnableToSendOTPException;

import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Component
public class MailSenderUtil {
    
    @Autowired
    private JavaMailSender mailSender;

    public void sendVerifyEmailOTPMail(String email, String otp) {
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

    public void sendResetPasswordOTPMail(String email, String otp) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            message.setFrom();
            message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(email));
            message.setSubject(otp + " is your OTP to reset your password");
            message.setContent(createForgotPasswordEmail(otp), "text/html");

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
