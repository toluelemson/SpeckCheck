package com.sc.feedback.repositories;

import com.sc.feedback.data.entities.FeedbackRequestEntity;
import com.sc.user.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FeedbackRequestRepository extends JpaRepository<FeedbackRequestEntity, UUID> {
    Optional<FeedbackRequestEntity> findById(UUID feedbackId);
    FeedbackRequestEntity findByRequestId(UUID feedbackId);
    List<FeedbackRequestEntity> findByUser(AppUser userId);

    FeedbackRequestEntity findByRequestURLCode(String urlCode);

}
