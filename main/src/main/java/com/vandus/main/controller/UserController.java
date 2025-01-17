package com.vandus.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vandus.main.model.User;
import com.vandus.main.service.UserService;

@RestController
@RequestMapping("${vandus.api.private}/user")
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") String id) {
        return userService.getUserById(id);
    }
}
