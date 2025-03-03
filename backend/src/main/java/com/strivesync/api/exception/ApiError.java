package com.strivesync.api.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Standard error response for API errors.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiError {

    private HttpStatus status;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime timestamp;
    
    private String message;
    private String debugMessage;
    
    @Builder.Default
    private List<ApiSubError> subErrors = new ArrayList<>();

    public ApiError(HttpStatus status) {
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }

    public ApiError(HttpStatus status, Throwable ex) {
        this(status);
        this.message = "Unexpected error";
        this.debugMessage = ex.getLocalizedMessage();
    }

    public ApiError(HttpStatus status, String message, Throwable ex) {
        this(status);
        this.message = message;
        this.debugMessage = ex.getLocalizedMessage();
    }

    /**
     * Add a validation error to the list of sub-errors.
     *
     * @param object the object that failed validation
     * @param field the field that failed validation
     * @param rejectedValue the value that was rejected
     * @param message the validation error message
     */
    public void addValidationError(String object, String field, Object rejectedValue, String message) {
        this.subErrors.add(ApiValidationError.builder()
                .object(object)
                .field(field)
                .rejectedValue(rejectedValue)
                .message(message)
                .build());
    }
} 