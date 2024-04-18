package com.sc.FeedbackService.appUser.service;

import com.sc.FeedbackService.appUser.dto.request.ChangePasswordRequest;
import com.sc.FeedbackService.appUser.dto.response.ChangePasswordResponse;
import com.sc.FeedbackService.appUser.dto.response.JwtResponse;
import com.sc.FeedbackService.appUser.model.AppUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.security.Principal;

public interface AppUserService {
    ChangePasswordResponse changePassword(ChangePasswordRequest changePasswordRequest, Principal secureUser);
    JwtResponse generateJwtToken(AppUser appUser);
    AppUser getUserByEmail(String email);
    AppUser authenticate(String email, String password);
    AppUser getAppUser(Principal secureUser);
    void revokeAllUserToken(AppUser appUser);
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
    String encodePassword(String password);
    AppUser saveAppUser(AppUser appUser);
}
