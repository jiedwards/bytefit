package com.bytefit.MealPlanner.repository;

import com.bytefit.MealPlanner.entity.Role;
import com.bytefit.MealPlanner.entity.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashSet;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RoleRepositoryTest {

    @Autowired
    private RoleRepository roleRepository;

    @Test
    public void testFindByRole() {
        String testRole = "ADMIN";
        User user = new User();
        HashSet roles = new HashSet();
        roles.add(testRole);
        user.setRoles(roles);

        Role roleResponse = roleRepository.findByRole(testRole);
        Assert.assertEquals(testRole, roleResponse.getRole());
    }
}