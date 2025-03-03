package com.strivesync.api.config;

import com.strivesync.api.entity.Role;
import com.strivesync.api.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

/**
 * Data initializer to create default roles on application startup.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("Initializing application data...");
        initRoles();
        log.info("Data initialization completed.");
    }

    /**
     * Initialize roles if they don't exist.
     */
    private void initRoles() {
        log.info("Checking and creating default roles...");
        
        // Check if roles already exist
        long roleCount = roleRepository.count();
        if (roleCount > 0) {
            log.info("Roles already exist in the database. Count: {}", roleCount);
            return;
        }
        
        // Create roles if they don't exist
        Arrays.stream(Role.RoleName.values()).forEach(roleName -> {
            Role role = Role.builder()
                    .name(roleName)
                    .build();
            roleRepository.save(role);
            log.info("Created role: {}", roleName);
        });
    }
} 