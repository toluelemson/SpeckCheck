package com.sc.FeedbackService.user.service;

import com.sc.FeedbackService.appUser.dto.response.JwtResponse;
import com.sc.FeedbackService.appUser.model.AppUser;
import com.sc.FeedbackService.appUser.model.UserRole;
import com.sc.FeedbackService.appUser.service.AppUserService;
import com.sc.FeedbackService.exception.AlreadyExistsException;
import com.sc.FeedbackService.exception.FeedbackServiceException;
import com.sc.FeedbackService.mail.MailService;
import com.sc.FeedbackService.user.dto.request.AuthenticationRequest;
import com.sc.FeedbackService.user.dto.response.AuthenticationResponse;
import com.sc.FeedbackService.user.dto.response.ConfirmationResponse;
import com.sc.FeedbackService.verificationToken.VerificationToken;
import com.sc.FeedbackService.verificationToken.VerificationTokenService;
import com.sc.FeedbackService.user.dto.request.RegisterUserRequest;
import com.sc.FeedbackService.user.dto.response.RegisterUserResponse;
import com.sc.FeedbackService.user.model.User;
import com.sc.FeedbackService.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final AppUserService appUserService;
    private final ModelMapper modelMapper;
    private final MailService mailService;
    private final VerificationTokenService verificationTokenService;
    @Override
    public RegisterUserResponse register(RegisterUserRequest request) {
        checkIfUserExists(request.getEmail());
        AppUser appUser = modelMapper.map(request, AppUser.class);
        appUser.setPassword(appUserService.encodePassword(request.getPassword()));
        appUser.setUserRole(UserRole.USER);
        User user = new User();
        user.setAppUser(appUser);
        User savedUser = userRepository.save(user);
        String link = verificationTokenService.generateVerificationToken(appUser);
        sendVerificationLink(appUser, link);
        return getRegisterResponse(savedUser);
    }

    private void checkIfUserExists(String email) {
        if(userRepository.existsByAppUserEmail(email))
            throw new AlreadyExistsException("User with the provided email already exists");
    }

    private RegisterUserResponse getRegisterResponse(User user){
        return RegisterUserResponse.builder()
                .message("Welcome to SpeckCheck. Kindly check your email to activate your account")
                .email(user.getAppUser().getEmail())
                .isEnabled(false)
                .build();
    }

    @Override
    public ConfirmationResponse confirmToken(String token, String email) {
        VerificationToken verificationToken =
                verificationTokenService.validateVerificationToken(token, email);
        AppUser appUser = verificationToken.getAppUser();
        if(!appUser.getIsEnabled()){
            appUser.setIsEnabled(true);
            AppUser savedAppUser = appUserService.saveAppUser(appUser);
            return getConfirmationResponse(savedAppUser);
        }
        throw new FeedbackServiceException("User is not enabled");
    }

    private ConfirmationResponse getConfirmationResponse(AppUser appUser) {
        JwtResponse jwtResponse = appUserService.generateJwtToken(appUser);
        return ConfirmationResponse.builder()
                .firstName(appUser.getFirstName())
                .lastName(appUser.getLastName())
                .email(appUser.getEmail())
                .jwtResponse(jwtResponse)
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        AppUser appUser = appUserService.authenticate(request.getEmail(), request.getPassword());
        appUserService.revokeAllUserToken(appUser);
        JwtResponse jwtResponse = appUserService.generateJwtToken(appUser);
        return AuthenticationResponse.builder()
                .jwtResponse(jwtResponse)
                .message("Authentication successful")
                .build();
    }

    private  void sendVerificationLink(AppUser appUser, String token) {
        String subject = "Account activation";
        String link = "http://localhost:8090/api/v1/auth/confirm?token=%s".formatted(token);
        String mailContent = mailService.buildVerificationMail(appUser.getFirstName(), link);
        mailService.sendMail(appUser.getEmail(), subject, mailContent);
    }
}