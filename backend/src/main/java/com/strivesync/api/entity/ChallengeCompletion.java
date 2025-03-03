package com.strivesync.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Entity representing a challenge completion record.
 */
@Entity
@Table(name = "challenge_completions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeCompletion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isCompleted = false;

    @Column(length = 2000)
    private String completionNotes;

    @OneToMany(mappedBy = "completion", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<CompletionProof> proofs = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CompletionStatus status;

    @Column
    private Integer experiencePointsEarned;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column
    private LocalDateTime completedAt;

    /**
     * Enum representing the status of a challenge completion.
     */
    public enum CompletionStatus {
        PENDING, APPROVED, REJECTED, COMPLETED
    }
} 