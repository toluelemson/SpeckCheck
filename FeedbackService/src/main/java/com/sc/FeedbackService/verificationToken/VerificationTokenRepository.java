package com.sc.FeedbackService.verificationToken;

import com.sc.FeedbackService.appUser.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByAppUser(AppUser appUser);
    VerificationToken findByTokenAndAppUserEmail(String token, String email);
}
