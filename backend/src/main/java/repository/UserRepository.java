package repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import model.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
