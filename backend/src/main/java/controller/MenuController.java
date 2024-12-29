package controller;

import model.MenuItem;
import repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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
