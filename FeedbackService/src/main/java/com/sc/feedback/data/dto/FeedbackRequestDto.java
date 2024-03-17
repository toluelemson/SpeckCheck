package com.sc.feedback.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.sql.Timestamp;
import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class FeedbackRequestDto {
    private UUID requestId;
    private String requestURLCode;
    private String recipientName;
    private String requestMessage;
    private Timestamp requestDate;

    private String feedbackUrl;

//    private List<FeedbackEntity> feedbacks;

}
