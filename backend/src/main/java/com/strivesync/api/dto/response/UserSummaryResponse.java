package com.strivesync.api.dto.response;

import com.strivesync.api.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for User summary information
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSummaryResponse {
    private Long id;
    private String username;
    private String email;
    private String profileImageUrl;
    private int level;
    private int experiencePoints;
    
    /**
     * Static factory method to convert User entity to UserSummaryResponse DTO
     * 
     * @param user The User entity
     * @return UserSummaryResponse DTO
     */
    public static UserSummaryResponse fromEntity(User user) {
        if (user == null) {
            return null;
        }
        
        return UserSummaryResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .profileImageUrl(user.getProfileImageUrl())
                .level(user.getLevel())
                .experiencePoints(user.getExperiencePoints())
                .build();
    }
} 