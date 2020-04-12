package com.bytefit.MealPlanner.controller;

import com.bytefit.MealPlanner.entity.User;
import com.bytefit.MealPlanner.repository.UserRepository;
import com.bytefit.MealPlanner.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class ApplicationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService service;

    @RequestMapping("/")
    public String viewHomePage() {
        return "index";
    }
}
