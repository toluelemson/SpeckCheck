package com.sc.moderationservice.repository;
import com.sc.moderationservice.model.Moderation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModerationRepository extends JpaRepository<Moderation,  Long> {

}
