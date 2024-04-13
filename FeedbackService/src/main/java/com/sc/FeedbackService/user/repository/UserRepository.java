package com.sc.FeedbackService.user.repository;

import com.sc.FeedbackService.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByAppUserEmail(String email);
}
