package com.example.backend.repository;

import com.example.backend.model.MenuItem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MenuRepository extends MongoRepository<MenuItem, String> {
}
