package com.sc.FeedbackService.user.dto.response;

import com.sc.FeedbackService.appUser.dto.response.JwtResponse;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ConfirmationResponse {
    private String message;
    private String firstName;
    private String lastName;
    private String email;
    private JwtResponse jwtResponse;
}
