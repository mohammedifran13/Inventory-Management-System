package com.project.supermarket.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.supermarket.entity.User;
import com.project.supermarket.service.UserService;

@CrossOrigin
@RestController
public class UserController {
	@Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/post")
    public String create (@RequestBody User user) {
        return userService.createUser(user);
        
    }
}