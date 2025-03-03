package com.strivesync.repository;

import com.strivesync.domain.ChallengeTask;
import com.strivesync.domain.TaskCompletion;
import com.strivesync.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Repository interface for TaskCompletion entity.
 */
@Repository
public interface TaskCompletionRepository extends JpaRepository<TaskCompletion, Long> {

    /**
     * Find task completions for a specific user.
     *
     * @param user the user to find completions for
     * @param pageable pagination information
     * @return a page of task completions
     */
    Page<TaskCompletion> findByUser(User user, Pageable pageable);

    /**
     * Find task completions for a specific task.
     *
     * @param task the task to find completions for
     * @param pageable pagination information
     * @return a page of task completions
     */
    Page<TaskCompletion> findByTask(ChallengeTask task, Pageable pageable);

    /**
     * Find task completions for a specific user and task.
     *
     * @param user the user to find completions for
     * @param task the task to find completions for
     * @return a list of task completions
     */
    List<TaskCompletion> findByUserAndTask(User user, ChallengeTask task);

    /**
     * Find task completions for a specific user within a date range.
     *
     * @param user the user to find completions for
     * @param startDate the start date of the range
     * @param endDate the end date of the range
     * @param pageable pagination information
     * @return a page of task completions
     */
    Page<TaskCompletion> findByUserAndCompletionDateBetween(User user, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    /**
     * Find task completions with a specific verification status.
     *
     * @param verificationStatus the verification status to filter by
     * @param pageable pagination information
     * @return a page of task completions
     */
    Page<TaskCompletion> findByVerificationStatus(TaskCompletion.VerificationStatus verificationStatus, Pageable pageable);

    /**
     * Count the number of task completions for a specific user and task.
     *
     * @param user the user to count completions for
     * @param task the task to count completions for
     * @return the number of completions
     */
    long countByUserAndTask(User user, ChallengeTask task);

    /**
     * Get the total points earned by a user for a specific challenge.
     *
     * @param userId the ID of the user
     * @param challengeId the ID of the challenge
     * @return the total points earned
     */
    @Query("SELECT SUM(t.points) FROM TaskCompletion tc JOIN tc.task t JOIN t.challenge c " +
           "WHERE tc.user.id = :userId AND c.id = :challengeId AND tc.verificationStatus = 'APPROVED'")
    Integer getTotalPointsForUserInChallenge(Long userId, Long challengeId);
} 