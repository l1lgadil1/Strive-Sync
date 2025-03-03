package com.strivesync.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for authentication response.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private Long expiresIn;
    private UserSummaryResponse user;

    /**
     * Create a new AuthResponse with the given access token and refresh token.
     *
     * @param accessToken the access token
     * @param refreshToken the refresh token
     * @param expiresIn the expiration time in seconds
     * @param user the user summary
     * @return the AuthResponse
     */
    public static AuthResponse of(String accessToken, String refreshToken, Long expiresIn, UserSummaryResponse user) {
        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(expiresIn)
                .user(user)
                .build();
    }
} 