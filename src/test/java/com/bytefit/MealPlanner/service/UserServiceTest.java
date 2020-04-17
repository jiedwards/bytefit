package com.bytefit.MealPlanner.service;

import com.bytefit.MealPlanner.entity.User;
import com.bytefit.MealPlanner.repository.RoleRepository;
import com.bytefit.MealPlanner.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.MockitoAnnotations.initMocks;

public class UserServiceTest {

    private UserRepository userRepository = mock(UserRepository.class);
    private RoleRepository roleRepository = mock(RoleRepository.class);
    private BCryptPasswordEncoder bCryptPasswordEncoder = mock(BCryptPasswordEncoder.class);

    private UserService userService;
    private User user;
    final String EMAIL = "test@test.com";

    @Before
    public void setUp() {
        initMocks(this);
        userService = new UserService(bCryptPasswordEncoder,
                userRepository,
                roleRepository);
        user = User.builder()
                .id(1)
                .firstname("Paul")
                .lastname("Felder")
                .email("test@test.com")
                .build();

        Mockito.when(userRepository.save(any()))
                .thenReturn(user);
        Mockito.when(userRepository.findByEmail(anyString()))
                .thenReturn(user);
    }

    @Test
    public void testFindUserByEmail() {
        final User result = userService.findUserByEmail(EMAIL);
        assertEquals(EMAIL, result.getEmail());
    }

    @Test
    public void testSaveUser() {
        User result = userService.saveUser(User.builder().build());
        assertEquals(EMAIL, result.getEmail());
    }

}