package com.sc.moderationservice.dto;

import com.sc.moderationservice.Enum.FeedbackStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDto {
    private  Long id;
    @Enumerated(EnumType.STRING)
    private FeedbackStatus feedbackStatus;
}
