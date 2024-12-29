package repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import model.MenuItem;

public interface MenuRepository extends MongoRepository<MenuItem, String> {
}
