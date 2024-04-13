package com.sc.FeedbackService.user.service;

import com.sc.FeedbackService.user.dto.request.RegisterUserRequest;
import com.sc.FeedbackService.user.dto.response.RegisterUserResponse;

public interface UserService {
    RegisterUserResponse register(RegisterUserRequest request);
}
