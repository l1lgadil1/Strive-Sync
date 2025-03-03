package com.strivesync.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * TaskCompletion entity representing a user's completion of a challenge task.
 */
@Entity
@Table(name = "task_completions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskCompletion extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false)
    private ChallengeTask task;

    @Column(name = "completion_date", nullable = false)
    private LocalDateTime completionDate;

    @Column(length = 500)
    private String notes;

    @Column(name = "verification_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private VerificationStatus verificationStatus;

    @Column(name = "verification_date")
    private LocalDateTime verificationDate;

    @Column(name = "verification_notes", length = 500)
    private String verificationNotes;

    /**
     * Enum representing the verification status of a task completion.
     */
    public enum VerificationStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
} 