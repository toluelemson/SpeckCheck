package com.sc.feedback.data.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sc.user.model.AppUser;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackRequestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID requestId;

    @Column(name = "requestURLCode", unique=true)
    private String requestURLCode;
    private String recipientName;
    private String requestMessage;
    private Timestamp requestDate;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fkRequestId", referencedColumnName = "requestId")
    private List<FeedbackEntity> feedbacks = new ArrayList<>();

    @JsonManagedReference
    @OneToOne()
    @JoinColumn(name = "fkUseId", referencedColumnName = "userId")
    private AppUser user;
    private String feedbackUrl;

    @PrePersist
    protected void onCreate() {
        requestURLCode = generateUniqueId();
    }

    private String generateUniqueId() {
        // Generate a unique 5-character ID, this is a basic example
        char[] chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".toCharArray();
        StringBuilder sb = new StringBuilder(5);
        Random random = new Random();
        for (int i = 0; i < 5; i++) {
            char c = chars[random.nextInt(chars.length)];
            sb.append(c);
        }
        return sb.toString();
    }
}

