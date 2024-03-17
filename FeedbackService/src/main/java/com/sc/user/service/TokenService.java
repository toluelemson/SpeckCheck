package com.sc.user.service;

import com.sc.user.model.Token;
import com.sc.user.repository.TokenRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
@Data
public class TokenService {

    private final TokenRepository tokenRepository;

//    public void saveConfirmationToken(Token token){
//        tokenRepository.save(token);
//    }

    public Optional<Token> getToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public int setConfirmAt(String token){
        return tokenRepository.updateConfirmedAt(token, LocalDateTime.now());
    }
}
