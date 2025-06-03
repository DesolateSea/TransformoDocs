package com.vandus.main.repository;

import com.vandus.main.model.User;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    /**
     * Find a user by their email address.
     * Use {@link #findByEmailExcludePassword(String)} to exclude the user's password.
     * 
     * @param email The email address of the user
     * @return An Optional containing the User entity with the specified email, or an empty Optional if no user with the specified email exists
     */
    Optional<User> findByEmail(String email);

    /** 
     * Find a user by their unique identifier.
     * Does not return the user's password.
     * 
     * @param id The unique identifier of the user
     * @return An Optional containing the User entity with the specified ID, or an empty Optional if no user with the specified ID exists
     */
    @Query(
        value = "{ '_id' : ?0 }",
        fields = "{ 'password' : 0 }"
    )
    Optional<User> findByIdExcludePassword(String id);

    /**
     * Find a user by their email address.
     * Does not return the user's password.
     * 
     * @param email The email address of the user
     * @return An Optional containing the User entity with the specified email, or an empty Optional if no user with the specified email exists
     */
    @Query(
        value = "{ 'email' : ?0 }",
        fields = "{ 'password' : 0 }"
    )
    Optional<User> findByEmailExcludePassword(String email);
}
