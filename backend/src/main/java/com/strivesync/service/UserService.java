package com.strivesync.service;

import com.strivesync.domain.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * Service interface for user-related operations.
 */
public interface UserService {

    /**
     * Find a user by username.
     *
     * @param username the username to search for
     * @return the user
     * @throws UsernameNotFoundException if the user is not found
     */
    User findByUsername(String username) throws UsernameNotFoundException;

    /**
     * Find a user by email.
     *
     * @param email the email to search for
     * @return the user
     * @throws UsernameNotFoundException if the user is not found
     */
    User findByEmail(String email) throws UsernameNotFoundException;

    /**
     * Check if a username exists.
     *
     * @param username the username to check
     * @return true if the username exists, false otherwise
     */
    boolean existsByUsername(String username);

    /**
     * Check if an email exists.
     *
     * @param email the email to check
     * @return true if the email exists, false otherwise
     */
    boolean existsByEmail(String email);

    /**
     * Create a new user.
     *
     * @param username the username
     * @param email the email
     * @param password the password
     * @param fullName the full name
     * @return the created user
     */
    User createUser(String username, String email, String password, String fullName);

    /**
     * Load a user by username.
     *
     * @param username the username to load
     * @return the UserDetails for the user
     * @throws UsernameNotFoundException if the user is not found
     */
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
} 