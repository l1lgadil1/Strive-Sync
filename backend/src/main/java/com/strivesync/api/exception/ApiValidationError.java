package com.strivesync.api.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Validation error details.
 */
@Data
@EqualsAndHashCode(callSuper = false)
@AllArgsConstructor
@Builder
public class ApiValidationError extends ApiSubError {
    
    private String object;
    private String field;
    private Object rejectedValue;
    private String message;
} 