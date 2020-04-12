package com.bytefit.MealPlanner.repository;

import com.bytefit.MealPlanner.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
