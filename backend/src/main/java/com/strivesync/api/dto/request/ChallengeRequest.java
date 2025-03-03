package com.strivesync.api.dto.request;

import com.strivesync.api.entity.Challenge;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Challenge creation and update requests
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeRequest {
    
    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;
    
    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;
    
    @Size(max = 2000, message = "Rules must not exceed 2000 characters")
    private String rules;
    
    @NotNull(message = "Start date is required")
    private LocalDateTime startDate;
    
    @NotNull(message = "End date is required")
    @Future(message = "End date must be in the future")
    private LocalDateTime endDate;
    
    @Builder.Default
    private boolean isPublic = true;
    
    @Builder.Default
    private boolean isTeamBased = false;
    
    @Min(value = 1, message = "Maximum participants must be at least 1")
    @Builder.Default
    private int maxParticipants = 10;
    
    @Min(value = 0, message = "Experience points cannot be negative")
    @Builder.Default
    private int experiencePoints = 100;
    
    private String imageUrl;
    
    @NotBlank(message = "Category is required")
    private String category;
    
    @NotBlank(message = "Difficulty is required")
    private String difficulty;
} 