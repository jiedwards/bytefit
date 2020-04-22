package com.bytefit.MealPlanner.controller;

import com.bytefit.MealPlanner.entity.User;
import com.bytefit.MealPlanner.repository.UserRepository;
import com.bytefit.MealPlanner.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;

@Controller
public class ApplicationController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @RequestMapping(value="/", method = RequestMethod.GET)
    public ModelAndView viewHomePage(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index");
        return modelAndView;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ModelAndView updateUserCalories(@RequestParam(value = "userCalories") Integer calorieIntake) {
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User userExists = userService.findUserByEmail(auth.getName());
        modelAndView.setViewName("index");
        if (userExists != null) {
            userService.updateUserCalories(userExists, calorieIntake);
            modelAndView.addObject("calorieSaved", "Calorie recommendation (" + calorieIntake +  ") has been successfully saved and updated.");
        }
        return modelAndView;
    }

    @RequestMapping(value="/login", method = RequestMethod.GET)
    public ModelAndView viewLoginPage(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("login");
        return modelAndView;
    }

    @RequestMapping(value="/register", method = RequestMethod.GET)
    public ModelAndView viewRegisterPage(){
        ModelAndView modelAndView = new ModelAndView();
        User user = new User();
        modelAndView.addObject("user", user);
        modelAndView.setViewName("register");
        return modelAndView;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ModelAndView createNewUser(@Valid User user, BindingResult bindingResult) {
        ModelAndView modelAndView = new ModelAndView();
        User userExists = userService.findUserByEmail(user.getEmail());
        if (userExists != null) {
            bindingResult
                    .rejectValue("email", "error.user",
                            "There is already a user registered with the email provided");
        }
        if (bindingResult.hasErrors()) {
            modelAndView.setViewName("register");
        } else {
            userService.saveUser(user);
            modelAndView.addObject("successMessage", "User has been registered successfully");
            modelAndView.addObject("user", new User());
            modelAndView.setViewName("register");

        }
        return modelAndView;
    }

    @RequestMapping(value="/admin/dashboard", method = RequestMethod.GET)
    public ModelAndView home(){
        ModelAndView modelAndView = new ModelAndView();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findUserByEmail(auth.getName());
        modelAndView.addObject("email", "Welcome " + user.getFirstname() + " " + user.getLastname() + " (" + user.getEmail() + ")");
        modelAndView.addObject("userCalories", user.getCalories());
        modelAndView.setViewName("admin/dashboard");
        return modelAndView;
    }


}
