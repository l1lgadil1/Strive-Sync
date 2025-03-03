package com.strivesync.repository;

import com.strivesync.domain.Challenge;
import com.strivesync.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository interface for Challenge entity.
 */
@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    /**
     * Find challenges created by a specific user.
     *
     * @param createdBy the user who created the challenges
     * @param pageable pagination information
     * @return a page of challenges
     */
    Page<Challenge> findByCreatedBy(User createdBy, Pageable pageable);

    /**
     * Find active challenges (status = ACTIVE).
     *
     * @param pageable pagination information
     * @return a page of active challenges
     */
    Page<Challenge> findByStatus(Challenge.ChallengeStatus status, Pageable pageable);

    /**
     * Find public challenges that are active or upcoming.
     *
     * @param statuses list of statuses to include
     * @param isPrivate whether the challenge is private
     * @param pageable pagination information
     * @return a page of public challenges
     */
    Page<Challenge> findByStatusInAndIsPrivate(List<Challenge.ChallengeStatus> statuses, boolean isPrivate, Pageable pageable);

    /**
     * Find challenges that start after a specific date.
     *
     * @param startDate the date after which challenges should start
     * @param pageable pagination information
     * @return a page of challenges
     */
    Page<Challenge> findByStartDateAfter(LocalDate startDate, Pageable pageable);

    /**
     * Find challenges that end before a specific date.
     *
     * @param endDate the date before which challenges should end
     * @param pageable pagination information
     * @return a page of challenges
     */
    Page<Challenge> findByEndDateBefore(LocalDate endDate, Pageable pageable);

    /**
     * Search for challenges by title or description.
     *
     * @param searchTerm the search term
     * @param pageable pagination information
     * @return a page of challenges matching the search term
     */
    @Query("SELECT c FROM Challenge c WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Challenge> searchByTitleOrDescription(String searchTerm, Pageable pageable);
} 