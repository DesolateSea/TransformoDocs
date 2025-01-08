package com.vandus.main.util.Messages;

import java.time.Year;

public class OTPMessage {

    public static String createVerificationEmail(String verificationCode) {
        return """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 30px auto;
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                    background-color: #007BFF;
                    border-radius: 10px 10px 0 0;
                    color: #ffffff;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #555555;
                }
                .verification-code {
                    display: block;
                    margin: 20px 0;
                    padding: 15px;
                    background-color: #f9f9f9;
                    border: 1px solid #dddddd;
                    text-align: center;
                    font-size: 24px;
                    color: #333333;
                    font-weight: bold;
                    letter-spacing: 2px;
                    border-radius: 5px;
                }
                .footer {
                    text-align: center;
                    padding: 20px 0;
                    color: #888888;
                    font-size: 14px;
                    border-top: 1px solid #dddddd;
                }
                .footer a {
                    color: #007BFF;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Verify Your Email</h1>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>Thank you for registering with us. Please use the verification code below to confirm your email address for <strong>Email Verification</strong>. This helps us ensure your account is secure and uniquely yours.</p>
                    <div class="verification-code">%s</div>
                    <p>If you didn’t request this, please ignore this email or contact our support team if you have concerns.</p>
                    <p>Welcome aboard!</p>
                </div>
                <div class="footer">
                    <p>&copy; %d TransformoDocs. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """.formatted( verificationCode, Year.now().getValue());
    }

    public static String createForgotPasswordEmail(String resetCode) {
        return """
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 30px auto;
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding: 20px 0;
                    background-color: #DC3545;
                    border-radius: 10px 10px 0 0;
                    color: #ffffff;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #555555;
                }
                .reset-code {
                    display: block;
                    margin: 20px 0;
                    padding: 15px;
                    background-color: #f9f9f9;
                    border: 1px solid #dddddd;
                    text-align: center;
                    font-size: 24px;
                    color: #333333;
                    font-weight: bold;
                    letter-spacing: 2px;
                    border-radius: 5px;
                }
                .footer {
                    text-align: center;
                    padding: 20px 0;
                    color: #888888;
                    font-size: 14px;
                    border-top: 1px solid #dddddd;
                }
                .footer a {
                    color: #007BFF;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Password Reset Request</h1>
                </div>
                <div class="content">
                    <p>Hello,</p>
                    <p>We received a request to reset your password for <strong>Reset Password</strong>. Please use the reset code below to proceed with updating your password:</p>
                    <div class="reset-code">%s</div>
                    <p>If you didn’t request this, please ignore this email or contact our support team for assistance. Your account remains secure.</p>
                    <p>Best regards,</p>
                </div>
                <div class="footer">
                    <p>&copy; %d TransformoDocs. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """.formatted( resetCode, Year.now().getValue());
    }
}
