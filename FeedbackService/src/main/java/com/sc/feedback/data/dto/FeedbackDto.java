package com.sc.feedback.data.dto;
import lombok.*;
import lombok.experimental.Accessors;

import java.sql.Timestamp;
import java.util.UUID;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class FeedbackDto {

    private UUID feedbackId;
    private String senderName;
    private String senderMessage;
    private String senderMessage2;
    private Timestamp feedbackDate;

}