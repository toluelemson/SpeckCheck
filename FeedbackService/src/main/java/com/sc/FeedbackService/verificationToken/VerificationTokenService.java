package com.sc.FeedbackService.verificationToken;

import com.sc.FeedbackService.appUser.model.AppUser;

public interface VerificationTokenService {
    String generateVerificationToken(AppUser appUser);
    VerificationToken validateVerificationToken(String token, String email);
    void deleteVerificationToken(VerificationToken verificationToken);
}
