package com.bytefit.MealPlanner.service;

import com.bytefit.MealPlanner.entity.User;
import com.bytefit.MealPlanner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public List<User> findAll() {
        return userRepo.findAll();
    }

    public void addNewUser(User user) {
        userRepo.save(user);
    }

    public User getUser(long userId) {
        return userRepo.findById(userId).get();
    }

    public void deleteUser(long userId) {
        userRepo.deleteById(userId);
    }
}
