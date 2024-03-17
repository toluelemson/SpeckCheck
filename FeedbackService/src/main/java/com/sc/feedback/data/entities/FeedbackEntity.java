package com.sc.feedback.data.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID feedbackId;
    private String senderName;
    private String senderMessage;
    private String senderMessage2;
    @CreationTimestamp
    private Timestamp feedbackDate;

}
