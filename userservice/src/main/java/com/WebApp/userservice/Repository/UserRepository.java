package com.WebApp.userservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.WebApp.userservice.Model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByEmail(String email);
    User findByEmail(String email);
}
