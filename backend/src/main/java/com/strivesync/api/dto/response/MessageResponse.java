package com.strivesync.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for simple message responses
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {
    private String message;
} 