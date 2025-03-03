package com.strivesync.api.controller;

import com.strivesync.api.dto.request.ChallengeRequest;
import com.strivesync.api.dto.response.ChallengeResponse;
import com.strivesync.api.dto.response.MessageResponse;
import com.strivesync.api.entity.Challenge;
import com.strivesync.api.entity.User;
import com.strivesync.api.repository.ChallengeRepository;
import com.strivesync.api.repository.UserRepository;
import com.strivesync.api.security.UserDetailsImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller for challenge endpoints.
 */
@RestController
@RequestMapping("/challenges")
@RequiredArgsConstructor
@Tag(name = "Challenges", description = "Challenge management API")
public class ChallengeController {

    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;

    /**
     * Get all challenges.
     *
     * @return the list of challenges
     */
    @GetMapping
    @Operation(summary = "Get all challenges", description = "Returns a list of all challenges")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved challenges",
                    content = @Content(mediaType = "application/json", 
                            array = @ArraySchema(schema = @Schema(implementation = ChallengeResponse.class))))
    })
    public ResponseEntity<List<ChallengeResponse>> getAllChallenges() {
        List<Challenge> challenges = challengeRepository.findAll();
        List<ChallengeResponse> challengeResponses = challenges.stream()
                .map(ChallengeResponse::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(challengeResponses);
    }

    /**
     * Get a challenge by ID.
     *
     * @param id the challenge ID
     * @return the challenge
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get challenge by ID", description = "Returns a challenge by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved challenge",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChallengeResponse.class))),
            @ApiResponse(responseCode = "404", description = "Challenge not found",
                    content = @Content)
    })
    public ResponseEntity<ChallengeResponse> getChallengeById(
            @Parameter(description = "Challenge ID", required = true) @PathVariable Long id) {
        Challenge challenge = challengeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Challenge not found with id: " + id));
        return ResponseEntity.ok(ChallengeResponse.fromEntity(challenge));
    }

    /**
     * Create a new challenge.
     *
     * @param challengeRequest the challenge request
     * @return the created challenge
     */
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Create a new challenge", 
            description = "Creates a new challenge (requires authentication)",
            security = @SecurityRequirement(name = "bearer-jwt")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Challenge created successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ChallengeResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request data",
                    content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden",
                    content = @Content)
    })
    public ResponseEntity<ChallengeResponse> createChallenge(@Valid @RequestBody ChallengeRequest challengeRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Challenge challenge = Challenge.builder()
                .title(challengeRequest.getTitle())
                .description(challengeRequest.getDescription())
                .rules(challengeRequest.getRules())
                .startDate(challengeRequest.getStartDate())
                .endDate(challengeRequest.getEndDate())
                .isPublic(challengeRequest.isPublic())
                .isTeamBased(challengeRequest.isTeamBased())
                .maxParticipants(challengeRequest.getMaxParticipants())
                .experiencePoints(challengeRequest.getExperiencePoints())
                .imageUrl(challengeRequest.getImageUrl())
                .category(challengeRequest.getCategory())
                .difficulty(challengeRequest.getDifficulty())
                .createdBy(user)
                .participants(List.of(user)) // Creator automatically joins the challenge
                .build();

        Challenge savedChallenge = challengeRepository.save(challenge);
        return ResponseEntity.ok(ChallengeResponse.fromEntity(savedChallenge));
    }

    /**
     * Join a challenge.
     *
     * @param id the challenge ID
     * @return the message response
     */
    @PostMapping("/{id}/join")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Join a challenge", 
            description = "Join an existing challenge (requires authentication)",
            security = @SecurityRequirement(name = "bearer-jwt")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully joined the challenge",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = MessageResponse.class))),
            @ApiResponse(responseCode = "400", description = "Already participating, maximum participants reached, or challenge ended",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = MessageResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Challenge not found",
                    content = @Content)
    })
    public ResponseEntity<MessageResponse> joinChallenge(
            @Parameter(description = "Challenge ID", required = true) @PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Challenge challenge = challengeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Challenge not found with id: " + id));

        if (challenge.getParticipants().contains(user)) {
            return ResponseEntity.badRequest().body(new MessageResponse("You are already participating in this challenge"));
        }

        if (challenge.getMaxParticipants() > 0 && challenge.getParticipants().size() >= challenge.getMaxParticipants()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Challenge has reached maximum participants"));
        }

        if (challenge.getEndDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Challenge has already ended"));
        }

        challenge.getParticipants().add(user);
        challengeRepository.save(challenge);

        return ResponseEntity.ok(new MessageResponse("Successfully joined the challenge"));
    }
} 