package com.strivesync.api.dto.response;

import com.strivesync.api.entity.Challenge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * DTO for Challenge response data
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeResponse {
    private Long id;
    private String title;
    private String description;
    private String rules;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean isPublic;
    private boolean isTeamBased;
    private int maxParticipants;
    private int experiencePoints;
    private String imageUrl;
    private String category;
    private String difficulty;
    private UserSummaryResponse createdBy;
    private List<UserSummaryResponse> participants;
    private int participantCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    /**
     * Static factory method to convert Challenge entity to ChallengeResponse DTO
     * 
     * @param challenge The Challenge entity
     * @return ChallengeResponse DTO
     */
    public static ChallengeResponse fromEntity(Challenge challenge) {
        return ChallengeResponse.builder()
                .id(challenge.getId())
                .title(challenge.getTitle())
                .description(challenge.getDescription())
                .rules(challenge.getRules())
                .startDate(challenge.getStartDate())
                .endDate(challenge.getEndDate())
                .isPublic(challenge.isPublic())
                .isTeamBased(challenge.isTeamBased())
                .maxParticipants(challenge.getMaxParticipants())
                .experiencePoints(challenge.getExperiencePoints())
                .imageUrl(challenge.getImageUrl())
                .category(challenge.getCategory())
                .difficulty(challenge.getDifficulty())
                .createdBy(UserSummaryResponse.fromEntity(challenge.getCreatedBy()))
                .participants(challenge.getParticipants() != null 
                    ? challenge.getParticipants().stream()
                        .map(UserSummaryResponse::fromEntity)
                        .collect(Collectors.toList())
                    : List.of())
                .participantCount(challenge.getParticipants() != null ? challenge.getParticipants().size() : 0)
                .createdAt(challenge.getCreatedAt())
                .updatedAt(challenge.getUpdatedAt())
                .build();
    }
} 