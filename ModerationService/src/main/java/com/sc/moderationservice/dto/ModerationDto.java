package com.sc.moderationservice.dto;

import com.sc.moderationservice.Enum.FeedbackStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ModerationDto {
    private Long id;
    private Long feedbackId;
    @Enumerated(EnumType.STRING)
    private FeedbackStatus feedbackStatus;
    private Long moderatorId;
    private LocalDate date;
    private String comments;


}
