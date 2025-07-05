package com.WebApp.userservice.Controller;

import com.WebApp.userservice.Model.User;
import com.WebApp.userservice.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user){
        if(userService.existsByEmail(user.getEmail())){
            return ResponseEntity.badRequest().body("Email already exists!!!");
        }
        user.setPassword(user.getPassword());
        userService.addUser(user);
        return ResponseEntity.ok("User Registered Successfully!!");
    }

    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestBody User loginRequest){
        User existingUser = userService.findByEmail(loginRequest.getEmail());
        if(existingUser == null || !existingUser.getPassword().equals(loginRequest.getPassword())){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok("Login Successfull!!");
    }

}
