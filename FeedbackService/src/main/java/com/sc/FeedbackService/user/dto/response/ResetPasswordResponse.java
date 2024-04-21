package com.sc.FeedbackService.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ResetPasswordResponse {
    private String message;
}
