package com.sc.FeedbackService.verificationToken;

import com.sc.FeedbackService.appUser.model.AppUser;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.LAZY)
    private AppUser appUser;
    @Column(unique = true)
    private String token;
    private final LocalDateTime createdAt = LocalDateTime.now();
    private final LocalDateTime expiredAt = createdAt.plusMinutes(30L);
}
