package com.bytefit.MealPlanner.repository;

import com.bytefit.MealPlanner.entity.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testUserRepositoryFindByEmail() {
        String email = "test@test.com";
        User user = new User();
        user.setEmail(email);

        User userResponse = userRepository.findByEmail(email);
        Assert.assertEquals(email, userResponse.getEmail());
    }


}