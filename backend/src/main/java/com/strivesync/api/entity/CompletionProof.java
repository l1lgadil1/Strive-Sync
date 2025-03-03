package com.strivesync.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

/**
 * Entity representing a proof of challenge completion.
 */
@Entity
@Table(name = "completion_proofs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompletionProof {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "completion_id", nullable = false)
    private ChallengeCompletion completion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProofType type;

    @Column(nullable = false)
    private String content;

    @Column
    private String fileUrl;

    @Column
    private String mimeType;

    @Column
    private Long fileSize;

    @CreationTimestamp
    private LocalDateTime createdAt;

    /**
     * Enum representing the type of proof.
     */
    public enum ProofType {
        TEXT, IMAGE, VIDEO, DOCUMENT, LINK
    }
} 