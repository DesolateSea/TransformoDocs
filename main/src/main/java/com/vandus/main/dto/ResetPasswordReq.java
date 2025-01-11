package com.vandus.main.dto;

public class ResetPasswordReq {
    public String email;
    public String token;
    public String password;

    public String getEmail(){
        return email;
    }
    public String getPassword(){
        return password;
    }
    public String getToken(){
        return token;
    }
    ResetPasswordReq(String email,String password,String token){
        this.email = email;
        this.password = password;
        this.token = token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public void setPassword(String password){
        this.password = password;
    }

}
