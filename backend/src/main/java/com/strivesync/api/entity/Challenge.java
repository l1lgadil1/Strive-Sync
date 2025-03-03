package com.strivesync.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Entity representing a challenge in the system.
 */
@Entity
@Table(name = "challenges")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String title;

    @NotBlank
    @Size(max = 2000)
    @Column(nullable = false, length = 2000)
    private String description;

    @Size(max = 5000)
    @Column(length = 5000)
    private String rules;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime startDate;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime endDate;

    @NotNull
    @Column(nullable = false)
    private boolean isPublic;

    @NotNull
    @Column(nullable = false)
    private boolean isTeamBased;

    @Column
    private int maxParticipants;

    @NotNull
    @Column(nullable = false)
    private int experiencePoints;

    @Size(max = 255)
    @Column
    private String imageUrl;

    @NotBlank
    @Column(nullable = false)
    private String category;

    @NotBlank
    @Column(nullable = false)
    private String difficulty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false)
    private User createdBy;

    @ManyToMany
    @JoinTable(
        name = "challenge_participants",
        joinColumns = @JoinColumn(name = "challenge_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    @Builder.Default
    private List<User> participants = new ArrayList<>();

    @ManyToMany(mappedBy = "challenges")
    @Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
    @Builder.Default
    private Set<Team> teams = new HashSet<>();

    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<ChallengeCompletion> completions = new HashSet<>();

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Constants for challenge categories
     */
    public static final class Categories {
        public static final String SPORTS = "SPORTS";
        public static final String READING = "READING";
        public static final String PRODUCTIVITY = "PRODUCTIVITY";
        public static final String NUTRITION = "NUTRITION";
        public static final String MINDFULNESS = "MINDFULNESS";
        public static final String LEARNING = "LEARNING";
        public static final String SOCIAL = "SOCIAL";
        public static final String CREATIVITY = "CREATIVITY";
        public static final String OTHER = "OTHER";
        
        private Categories() {}
    }

    /**
     * Constants for challenge difficulties
     */
    public static final class Difficulties {
        public static final String BEGINNER = "BEGINNER";
        public static final String INTERMEDIATE = "INTERMEDIATE";
        public static final String ADVANCED = "ADVANCED";
        public static final String EXPERT = "EXPERT";
        
        private Difficulties() {}
    }

    /**
     * Pre-persist hook to set default values.
     */
    @PrePersist
    public void prePersist() {
        if (category == null) {
            category = Categories.OTHER;
        }
        if (difficulty == null) {
            difficulty = Difficulties.INTERMEDIATE;
        }
    }
} 