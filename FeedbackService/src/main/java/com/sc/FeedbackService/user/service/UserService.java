package com.sc.FeedbackService.user.service;


import com.sc.FeedbackService.user.dto.request.UpdateUserRequest;
import com.sc.FeedbackService.user.dto.response.UserResponse;

public interface UserService {
    UserResponse getUserById(Long userId);
    UserResponse getUserByEmail(String email);
    void deleteUserById(Long id);
    UserResponse updateUserById(UpdateUserRequest request, Long userId);
}
