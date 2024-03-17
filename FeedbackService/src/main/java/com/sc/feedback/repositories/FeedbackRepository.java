package com.sc.feedback.repositories;
import com.sc.feedback.data.entities.FeedbackEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;
import java.util.UUID;

@Repository
public interface FeedbackRepository extends JpaRepository<FeedbackEntity, UUID>{
    Optional<FeedbackEntity> findById(UUID feedbackId);

}


