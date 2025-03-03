package com.strivesync.api.repository;

import com.strivesync.api.entity.Challenge;
import com.strivesync.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for Challenge entity.
 */
@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    /**
     * Find challenges by creator.
     *
     * @param createdBy the creator
     * @return the list of challenges
     */
    List<Challenge> findByCreatedBy(User createdBy);

    /**
     * Find challenges by category.
     *
     * @param category the category
     * @return the list of challenges
     */
    List<Challenge> findByCategory(String category);

    /**
     * Find challenges by difficulty.
     *
     * @param difficulty the difficulty
     * @return the list of challenges
     */
    List<Challenge> findByDifficulty(String difficulty);

    /**
     * Find public challenges.
     *
     * @return the list of challenges
     */
    List<Challenge> findByIsPublicTrue();

    /**
     * Find challenges created by a specific user
     *
     * @param userId The user ID
     * @return List of challenges created by the user
     */
    List<Challenge> findByCreatedBy_Id(Long userId);

    /**
     * Find challenges that a user is participating in
     *
     * @param userId The user ID
     * @return List of challenges the user is participating in
     */
    @Query("SELECT c FROM Challenge c JOIN c.participants p WHERE p.id = :userId")
    List<Challenge> findChallengesByParticipantId(Long userId);
} 