package com.strivesync.api.controller;

import com.strivesync.domain.Challenge;
import com.strivesync.domain.User;
import com.strivesync.repository.ChallengeRepository;
import com.strivesync.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for challenge-related endpoints.
 */
@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
@Tag(name = "Challenges", description = "Challenge management endpoints")
@SecurityRequirement(name = "Bearer Authentication")
public class ChallengeController {

    private final ChallengeRepository challengeRepository;
    private final UserRepository userRepository;

    /**
     * Get all challenges.
     *
     * @param pageable pagination information
     * @return a page of challenges
     */
    @GetMapping
    @Operation(summary = "Get all challenges", description = "Returns a paginated list of all challenges")
    public ResponseEntity<Page<Challenge>> getAllChallenges(Pageable pageable) {
        return ResponseEntity.ok(challengeRepository.findAll(pageable));
    }

    /**
     * Get a challenge by ID.
     *
     * @param id the challenge ID
     * @return the challenge
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get a challenge by ID", description = "Returns a challenge by its ID")
    public ResponseEntity<Challenge> getChallengeById(@PathVariable Long id) {
        return challengeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Search for challenges by title or description.
     *
     * @param query the search query
     * @param pageable pagination information
     * @return a page of challenges matching the search query
     */
    @GetMapping("/search")
    @Operation(summary = "Search for challenges", description = "Returns a paginated list of challenges matching the search query")
    public ResponseEntity<Page<Challenge>> searchChallenges(@RequestParam String query, Pageable pageable) {
        return ResponseEntity.ok(challengeRepository.searchByTitleOrDescription(query, pageable));
    }

    /**
     * Get challenges created by the current user.
     *
     * @param userDetails the current user
     * @param pageable pagination information
     * @return a page of challenges created by the current user
     */
    @GetMapping("/my-challenges")
    @Operation(summary = "Get challenges created by the current user", description = "Returns a paginated list of challenges created by the current user")
    public ResponseEntity<Page<Challenge>> getMyChallenges(
            @AuthenticationPrincipal UserDetails userDetails,
            Pageable pageable) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return ResponseEntity.ok(challengeRepository.findByCreatedBy(user, pageable));
    }

    /**
     * Get challenges the current user is participating in.
     *
     * @param userDetails the current user
     * @return a list of challenges the current user is participating in
     */
    @GetMapping("/participating")
    @Operation(summary = "Get challenges the current user is participating in", description = "Returns a list of challenges the current user is participating in")
    public ResponseEntity<List<Challenge>> getParticipatingChallenges(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return ResponseEntity.ok(List.copyOf(user.getParticipatingChallenges()));
    }
} 