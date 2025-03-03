package com.strivesync.api.entity;

import jakarta.persistence.*;
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

/**
 * Entity representing an achievement in the system.
 */
@Entity
@Table(name = "achievements")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, unique = true)
    private String name;

    @NotBlank
    @Size(max = 500)
    @Column(nullable = false)
    private String description;

    @Size(max = 255)
    @Column
    private String iconUrl;

    @Column(nullable = false)
    private Integer experiencePoints;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AchievementType type;

    @Column
    private String criteria;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Enum representing the type of achievement.
     */
    public enum AchievementType {
        CHALLENGE_COMPLETION, STREAK, LEVEL_UP, SOCIAL, SPECIAL
    }

    /**
     * Pre-persist hook to set default values.
     */
    @PrePersist
    public void prePersist() {
        if (experiencePoints == null) {
            experiencePoints = 0;
        }
        if (type == null) {
            type = AchievementType.CHALLENGE_COMPLETION;
        }
    }
} 