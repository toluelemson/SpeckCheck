package com.sc.FeedbackService.verificationToken;

import com.sc.FeedbackService.appUser.model.AppUser;
import com.sc.FeedbackService.exception.VerificationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VerificationTokenServiceImpl implements VerificationTokenService {
    private final VerificationTokenRepository verificationTokenRepository;

    @Override
    public String generateVerificationToken(AppUser appUser) {
        VerificationToken existingToken = verificationTokenRepository.findByAppUser(appUser);
        if(existingToken != null)
            verificationTokenRepository.delete(existingToken);
        String generatedToken = generateToken();
        VerificationToken verificationToken = VerificationToken.builder()
                .appUser(appUser)
                .token(generatedToken)
                .build();
        verificationTokenRepository.save(verificationToken);
        return generatedToken;
    }
    private static String generateToken(){
        return UUID.randomUUID().toString();
    }

    public static void main(String[] args) {
        System.out.println(generateToken());
    }

    @Override
    public VerificationToken validateVerificationToken(String token, String email) {
        VerificationToken verificationToken = verificationTokenRepository.findByTokenAndAppUserEmail(token, email);
        if(verificationToken ==  null)
            throw new VerificationException("Verification link is invalid");
        else if (verificationToken.getExpiredAt().isBefore(LocalDateTime.now())){
            verificationTokenRepository.delete(verificationToken);
            throw new VerificationException("Verification link is expired");
        }
        return verificationToken;
    }

    @Override
    public void deleteVerificationToken(VerificationToken verificationToken) {
        verificationTokenRepository.delete(verificationToken);
    }
}
