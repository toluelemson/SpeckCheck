package com.sc.FeedbackService.user.service;

import com.sc.FeedbackService.appUser.model.AppUser;
import com.sc.FeedbackService.exception.NotFoundException;
import com.sc.FeedbackService.user.dto.request.UpdateUserRequest;
import com.sc.FeedbackService.user.dto.response.UserResponse;
import com.sc.FeedbackService.user.model.User;
import com.sc.FeedbackService.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    @Override
    public UserResponse getUserById(Long userId) {
        User user = findUserById(userId);
        return getUserResponse(user);
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(
                ()-> new NotFoundException("User with the provided id not found"));
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        User user = findUserByEmail(email);
        return getUserResponse(user);
    }

    private User findUserByEmail(String email){
        return userRepository.findByAppUserEmail(email).orElseThrow(
                ()-> new NotFoundException("User with the provided email not found"));
    }

    @Override
    public UserResponse updateUserById(UpdateUserRequest request, Long userId) {
        User user = findUserById(userId);
        AppUser appUser = user.getAppUser();
        appUser.setFirstName(request.getFirstName());
        appUser.setLastName(request.getLastName());
        user.setAppUser(appUser);
        User savedUser = userRepository.save(user);
        return getUserResponse(savedUser);
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
    private static UserResponse getUserResponse(User user){
        return UserResponse.builder()
                .userId(user.getId())
                .firstName(user.getAppUser().getFirstName())
                .lastName(user.getAppUser().getLastName())
                .email(user.getAppUser().getEmail())
                .build();
    }
}
