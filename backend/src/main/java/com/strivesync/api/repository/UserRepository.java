package com.strivesync.api.repository;

import com.strivesync.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for User entity.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find a user by username.
     *
     * @param username the username
     * @return the user
     */
    Optional<User> findByUsername(String username);

    /**
     * Find a user by email.
     *
     * @param email the email
     * @return the user
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if a user exists by username.
     *
     * @param username the username
     * @return true if the user exists, false otherwise
     */
    Boolean existsByUsername(String username);

    /**
     * Check if a user exists by email.
     *
     * @param email the email
     * @return true if the user exists, false otherwise
     */
    Boolean existsByEmail(String email);
} 