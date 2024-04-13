package com.sc.FeedbackService.user.service;

import com.sc.FeedbackService.appUser.model.AppUser;
import com.sc.FeedbackService.appUser.model.UserRole;
import com.sc.FeedbackService.appUser.repository.AppUserRepository;
import com.sc.FeedbackService.appUser.service.AppUserService;
import com.sc.FeedbackService.exception.AlreadyExistsException;
import com.sc.FeedbackService.user.dto.request.RegisterUserRequest;
import com.sc.FeedbackService.user.dto.response.RegisterUserResponse;
import com.sc.FeedbackService.user.model.User;
import com.sc.FeedbackService.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final AppUserService appUserService;
    private final ModelMapper modelMapper;
    @Override
    public RegisterUserResponse register(RegisterUserRequest request) {
        checkIfUserExists(request.getEmail());
        AppUser appUser = modelMapper.map(request, AppUser.class);
        appUser.setPassword(appUserService.encodePassword(request.getPassword()));
        appUser.setUserRole(UserRole.USER);
        User user = new User();
        user.setAppUser(appUser);
        User savedUser = userRepository.save(user);
        return getRegisterResponse(savedUser);
    }

    private void checkIfUserExists(String email) {
        if(userRepository.existsByAppUserEmail(email))
            throw new AlreadyExistsException("User with the provided email already exists");
    }

    private RegisterUserResponse getRegisterResponse(User user){
        return RegisterUserResponse.builder()
                .message("Welcome to SpeckCheck. Kindly check to activate your account")
                .userId(user.getId())
                .isEnabled(false)
                .build();
    }
}
