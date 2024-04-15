package com.sc.FeedbackService.user.dto.response;

import com.sc.FeedbackService.appUser.dto.response.JwtResponse;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AuthenticationResponse {
    private JwtResponse jwtResponse;
    private String message;
}
