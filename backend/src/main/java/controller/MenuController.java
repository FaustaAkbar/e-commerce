package com.example.backend.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.MenuItem;
import com.example.backend.repository.MenuRepository;
@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @Autowired
    private MenuRepository menuRepository;

    // Get all menu items
    @GetMapping("/")
    public List<MenuItem> getAllMenuItems() {
        return menuRepository.findAll();
    }

    // Add a new menu item
    @PostMapping("/")
    public MenuItem addMenuItem(@RequestBody MenuItem menuItem) {
        return menuRepository.save(menuItem);
    }
     // GET menu item by ID
    @GetMapping("/{id}")
    public Optional<MenuItem> getMenuItemById(@PathVariable String id) {
        return menuRepository.findById(id);
    }
}
