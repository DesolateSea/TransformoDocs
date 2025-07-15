package com.vandus.main.repository;

import com.vandus.main.model.DocumentFile;
import com.vandus.main.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentFileRepository extends MongoRepository<DocumentFile, String> {
    
    @NonNull Optional<DocumentFile> findById(@NonNull String id);

    /**
     * Finds all documents owned by a specific user.
     * 
     * @param owner The user whose documents to find
     * @return A list of documents owned by the specified user
     */
    List<DocumentFile> findByOwner(User owner);
}