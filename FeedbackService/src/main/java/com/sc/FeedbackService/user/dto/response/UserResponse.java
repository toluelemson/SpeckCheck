package com.sc.FeedbackService.user.dto.response;

import com.sc.FeedbackService.appUser.model.AppUser;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserResponse {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
}
