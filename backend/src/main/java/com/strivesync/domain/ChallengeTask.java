package com.strivesync.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * ChallengeTask entity representing a task within a challenge.
 */
@Entity
@Table(name = "challenge_tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeTask extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Integer points;

    @Column(name = "is_recurring", nullable = false)
    private boolean isRecurring = false;

    @Column(name = "recurrence_pattern")
    private String recurrencePattern;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<TaskCompletion> completions = new HashSet<>();
} 