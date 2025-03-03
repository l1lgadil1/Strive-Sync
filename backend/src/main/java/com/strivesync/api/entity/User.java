package com.strivesync.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Entity representing a user in the system.
 */
@Entity
@Table(name = "users", 
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "username"),
           @UniqueConstraint(columnNames = "email")
       })
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false)
    private String username;

    @NotBlank
    @Size(max = 100)
    @Email
    @Column(nullable = false)
    private String email;

    @NotBlank
    @Size(max = 120)
    @Column(nullable = false)
    private String password;

    @Size(max = 255)
    private String fullName;

    @Size(max = 1000)
    private String bio;

    private String profileImageUrl;

    @Column(nullable = false)
    @Builder.Default
    private Integer experiencePoints = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer level = 1;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    @ManyToMany(mappedBy = "participants")
    @Builder.Default
    private Set<Challenge> challenges = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<ChallengeCompletion> completions = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "user_achievements",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "achievement_id")
    )
    @Builder.Default
    private Set<Achievement> achievements = new HashSet<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "is_enabled")
    private Boolean isEnabled;

    @Column(name = "is_account_non_locked")
    private Boolean isAccountNonLocked;

    @Column(name = "is_account_non_expired")
    private Boolean isAccountNonExpired;

    @Column(name = "is_credentials_non_expired")
    private Boolean isCredentialsNonExpired;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private UserStatus status;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_friends",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
    @Builder.Default
    private Set<User> friends = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_teams",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
    @Builder.Default
    private Set<Team> teams = new HashSet<>();

    /**
     * User status enum.
     */
    public enum UserStatus {
        ACTIVE,
        INACTIVE,
        BANNED,
        PENDING
    }

    /**
     * Pre-persist hook to set default values.
     */
    @PrePersist
    public void prePersist() {
        if (experiencePoints == null) {
            experiencePoints = 0;
        }
        if (level == null) {
            level = 1;
        }
        if (isEnabled == null) {
            isEnabled = true;
        }
        if (isAccountNonLocked == null) {
            isAccountNonLocked = true;
        }
        if (isAccountNonExpired == null) {
            isAccountNonExpired = true;
        }
        if (isCredentialsNonExpired == null) {
            isCredentialsNonExpired = true;
        }
        if (status == null) {
            status = UserStatus.ACTIVE;
        }
    }
} 