package com.sc.FeedbackService.user.service;

import com.sc.FeedbackService.appUser.dto.request.ChangePasswordRequest;
import com.sc.FeedbackService.appUser.dto.response.ChangePasswordResponse;
import com.sc.FeedbackService.user.dto.request.AuthenticationRequest;
import com.sc.FeedbackService.user.dto.request.RegisterUserRequest;
import com.sc.FeedbackService.user.dto.request.ResetPasswordRequest;
import com.sc.FeedbackService.user.dto.response.AuthenticationResponse;
import com.sc.FeedbackService.user.dto.response.ConfirmationResponse;
import com.sc.FeedbackService.user.dto.response.RegisterUserResponse;
import com.sc.FeedbackService.user.dto.response.ResetPasswordResponse;

import java.security.Principal;

public interface AuthService {
    RegisterUserResponse register(RegisterUserRequest request);
    ConfirmationResponse confirmToken(String token, String email);
    AuthenticationResponse authenticate(AuthenticationRequest request);
    ChangePasswordResponse changePassword(ChangePasswordRequest changePasswordRequest, Principal securedUser);
    void sendResetPasswordMail(String email);
    ResetPasswordResponse resetPassword(ResetPasswordRequest request, String token);
}
