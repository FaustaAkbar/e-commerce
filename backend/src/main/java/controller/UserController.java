package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/check-username")
    public ResponseEntity<?> checkUsername(@RequestBody String username) {
        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("message", "Username cannot be empty"));
        }
        Optional<User> user = userRepository.findByUsername(username.trim());
        boolean isAvailable = user.isEmpty();
        return ResponseEntity.ok(Collections.singletonMap("isAvailable", isAvailable));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
    try {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(Collections.singletonMap("message", "Username is required"));
        }

        Optional<User> existingUsername = userRepository.findByUsername(user.getUsername().trim());
        if (existingUsername.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Collections.singletonMap("message", "Username already taken"));
        }

        Optional<User> existingEmail = userRepository.findByEmail(user.getEmail().trim());
        if (existingEmail.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Collections.singletonMap("message", "Email already registered"));
        }

        user.setUsername(user.getUsername().trim());
        user.setEmail(user.getEmail().trim());
        User savedUser = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap("message", "Account successfully created!"));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("message", "An error occurred: " + e.getMessage()));
    }
}

}
