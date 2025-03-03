package com.strivesync.api.exception;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Objects;

/**
 * Global exception handler for the API.
 * Handles exceptions and returns standardized error responses.
 */
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Handle MethodArgumentNotValidException. Triggered when an object fails @Valid validation.
     *
     * @param ex the exception
     * @param headers the headers to be written to the response
     * @param status the selected response status
     * @param request the current request
     * @return a ResponseEntity with the error details
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
        apiError.setMessage("Validation error");
        
        // Add field errors
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            apiError.addValidationError(
                    error.getObjectName(),
                    error.getField(),
                    error.getRejectedValue(),
                    error.getDefaultMessage()
            );
        }
        
        // Add global errors
        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            apiError.addValidationError(
                    error.getObjectName(),
                    null,
                    null,
                    error.getDefaultMessage()
            );
        }
        
        return buildResponseEntity(apiError);
    }

    /**
     * Handle ConstraintViolationException. Triggered when a constraint is violated.
     *
     * @param ex the exception
     * @return a ResponseEntity with the error details
     */
    @ExceptionHandler(ConstraintViolationException.class)
    protected ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException ex) {
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
        apiError.setMessage("Validation error");
        
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            apiError.addValidationError(
                    violation.getRootBeanClass().getSimpleName(),
                    violation.getPropertyPath().toString(),
                    violation.getInvalidValue(),
                    violation.getMessage()
            );
        }
        
        return buildResponseEntity(apiError);
    }

    /**
     * Handle EntityNotFoundException. Triggered when an entity is not found.
     *
     * @param ex the exception
     * @return a ResponseEntity with the error details
     */
    @ExceptionHandler(EntityNotFoundException.class)
    protected ResponseEntity<Object> handleEntityNotFound(EntityNotFoundException ex) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
        apiError.setMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }

    /**
     * Handle UsernameNotFoundException. Triggered when a user is not found.
     *
     * @param ex the exception
     * @return a ResponseEntity with the error details
     */
    @ExceptionHandler(UsernameNotFoundException.class)
    protected ResponseEntity<Object> handleUsernameNotFound(UsernameNotFoundException ex) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
        apiError.setMessage(ex.getMessage());
        return buildResponseEntity(apiError);
    }

    /**
     * Handle BadCredentialsException. Triggered when authentication fails.
     *
     * @param ex the exception
     * @return a ResponseEntity with the error details
     */
    @ExceptionHandler(BadCredentialsException.class)
    protected ResponseEntity<Object> handleBadCredentials(BadCredentialsException ex) {
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
        apiError.setMessage("Invalid username or password");
        return buildResponseEntity(apiError);
    }

    /**
     * Handle AccessDeniedException. Triggered when a user doesn't have permission.
     *
     * @param ex the exception
     * @return a ResponseEntity with the error details
     */
    @ExceptionHandler(AccessDeniedException.class)
    protected ResponseEntity<Object> handleAccessDenied(AccessDeniedException ex) {
        ApiError apiError = new ApiError(HttpStatus.FORBIDDEN);
        apiError.setMessage("Access denied");
        return buildResponseEntity(apiError);
    }

    /**
     * Handle all other exceptions. Triggered by any unhandled exception.
     *
     * @param ex the exception
     * @return a ResponseEntity with the error details
     */
    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleAllExceptions(Exception ex) {
        log.error("Unhandled exception", ex);
        ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, ex);
        return buildResponseEntity(apiError);
    }

    /**
     * Build a ResponseEntity with the given ApiError.
     *
     * @param apiError the ApiError
     * @return a ResponseEntity with the ApiError
     */
    private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {
        return new ResponseEntity<>(apiError, Objects.requireNonNull(apiError.getStatus()));
    }
} 