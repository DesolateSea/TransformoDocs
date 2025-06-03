package com.vandus.main.repository;

import com.vandus.main.model.DocumentFile;
import com.vandus.main.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentFileRepository extends MongoRepository<DocumentFile, String> {
    
    Optional<DocumentFile> findById(String id);

    List<DocumentFile> findByOwner(User owner);
}