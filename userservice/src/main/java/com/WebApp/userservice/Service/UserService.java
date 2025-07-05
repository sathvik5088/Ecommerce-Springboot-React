package com.WebApp.userservice.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.WebApp.userservice.Model.User;
import com.WebApp.userservice.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User addUser(User user) {
        return userRepo.save(user);
    }

    public void deleteUser(int id) {
        userRepo.deleteById(id);
    }

    public boolean existsByEmail(String email){
        return userRepo.existsByEmail(email);
    }

    public User findByEmail(String email){
        return userRepo.findByEmail(email);
    }
}
