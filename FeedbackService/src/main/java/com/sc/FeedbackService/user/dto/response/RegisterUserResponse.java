package com.sc.FeedbackService.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RegisterUserResponse {
    private String message;
    private String email;
    private Boolean isEnabled;
}