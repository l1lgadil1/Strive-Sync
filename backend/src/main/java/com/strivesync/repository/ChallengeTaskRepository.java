package com.strivesync.repository;

import com.strivesync.domain.Challenge;
import com.strivesync.domain.ChallengeTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for ChallengeTask entity.
 */
@Repository
public interface ChallengeTaskRepository extends JpaRepository<ChallengeTask, Long> {

    /**
     * Find tasks for a specific challenge.
     *
     * @param challenge the challenge to find tasks for
     * @return a list of tasks for the challenge
     */
    List<ChallengeTask> findByChallenge(Challenge challenge);

    /**
     * Find recurring tasks for a specific challenge.
     *
     * @param challenge the challenge to find tasks for
     * @param isRecurring whether the task is recurring
     * @return a list of recurring tasks for the challenge
     */
    List<ChallengeTask> findByChallengeAndIsRecurring(Challenge challenge, boolean isRecurring);

    /**
     * Find tasks for a specific challenge ordered by points (descending).
     *
     * @param challenge the challenge to find tasks for
     * @return a list of tasks ordered by points
     */
    List<ChallengeTask> findByChallengeOrderByPointsDesc(Challenge challenge);
} 