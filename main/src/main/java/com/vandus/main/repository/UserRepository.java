package com.vandus.main.repository;

import com.vandus.main.model.User;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);

    @Query(
        value = "{ '_id' : ?0 }",
        fields = "{ 'password' : 0 }"
    )
    Optional<User> findByIdExcludePassword(String id);

    @Query(
        value = "{ 'email' : ?0 }",
        fields = "{ 'password' : 0 }"
    )
    Optional<User> findByEmailExcludePassword(String email);
}
