package com.sc.FeedbackService.handler;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class ErrorResponse {
    private String message;
    private LocalDateTime time;
}
