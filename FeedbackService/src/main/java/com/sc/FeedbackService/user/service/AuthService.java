package com.sc.FeedbackService.user.service;

import com.sc.FeedbackService.user.dto.request.AuthenticationRequest;
import com.sc.FeedbackService.user.dto.request.RegisterUserRequest;
import com.sc.FeedbackService.user.dto.response.AuthenticationResponse;
import com.sc.FeedbackService.user.dto.response.ConfirmationResponse;
import com.sc.FeedbackService.user.dto.response.RegisterUserResponse;

public interface AuthService {
    RegisterUserResponse register(RegisterUserRequest request);
    ConfirmationResponse confirmToken(String token, String email);
    AuthenticationResponse authentication(AuthenticationRequest request);
}
