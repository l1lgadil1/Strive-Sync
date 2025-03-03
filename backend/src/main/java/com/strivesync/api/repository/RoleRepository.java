package com.strivesync.api.repository;

import com.strivesync.api.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for Role entity.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    /**
     * Find a role by name.
     *
     * @param name the role name
     * @return the role
     */
    Optional<Role> findByName(Role.RoleName name);
} 