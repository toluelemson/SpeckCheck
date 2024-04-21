package com.sc.FeedbackService.appUser.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sc.FeedbackService.appUser.dto.request.ChangePasswordRequest;
import com.sc.FeedbackService.appUser.dto.response.ChangePasswordResponse;
import com.sc.FeedbackService.appUser.dto.response.JwtResponse;
import com.sc.FeedbackService.appUser.model.AppUser;
import com.sc.FeedbackService.appUser.repository.AppUserRepository;
import com.sc.FeedbackService.exception.FeedbackServiceException;
import com.sc.FeedbackService.security.SecureUser;
import com.sc.FeedbackService.security.services.AppUserDetailsService;
import com.sc.FeedbackService.security.services.JwtService;
import com.sc.FeedbackService.security.token.Token;
import com.sc.FeedbackService.security.token.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppUserServiceImpl implements AppUserService{
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;

    @Override
    public ChangePasswordResponse changePassword(ChangePasswordRequest request, Principal connectedUser) {
        SecureUser securedUser = (SecureUser) ((UsernamePasswordAuthenticationToken)connectedUser).getPrincipal();
        AppUser appUser = securedUser.getAppUser();
        checkIfCurrentPasswordIsCorrect(request.getCurrentPassword(), appUser.getPassword());
        checkIfTwoPasswordAreTheSame(request.getNewPassword(), request.getConfirmPassword());
        appUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
        appUserRepository.save(appUser);
        return ChangePasswordResponse.builder()
                .message("Password changed successfully")
                .build();
    }

    private void checkIfCurrentPasswordIsCorrect(String currentPassword, String appUserPassword) {
        if(!passwordEncoder.matches(currentPassword, appUserPassword))
            throw new BadCredentialsException("Wrong current password");
    }

    private void checkIfTwoPasswordAreTheSame(String newPassword, String confirmPassword){
        if(!newPassword.equals(confirmPassword))
            throw new BadCredentialsException("Password are not the same");
    }

    @Override
    public JwtResponse generateJwtToken(AppUser appUser) {
        final String email = appUser.getEmail();
        HashMap<String, Object> claims = getClaims(appUser);
        final String accessToken = jwtService.generateAccessToken(claims, email);
        final String refreshToken = jwtService.generateRefreshToken(claims, email);
        saveToken(appUser, accessToken);
        return JwtResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public AppUser getUserByEmail(String email) {
        return appUserRepository.findByEmail(email).orElseThrow(
                ()-> new UsernameNotFoundException("User with the provided email not found"));
    }

    private static HashMap<String, Object> getClaims(AppUser appUser) {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("role", appUser.getUserRole());
        claims.put("list of permissions", appUser.getUserRole().getPermissions().stream().toList());
        SecureUser securedUser = new SecureUser(appUser);
        securedUser.getAuthorities().forEach(claim -> claims.put("claims", claim));
        return claims;
    }

    private void saveToken(AppUser appUser, String jwtToken) {
        final Token token = new Token();
        token.setToken(jwtToken);
        token.setAppUser(appUser);
        token.setRevoked(false);
        token.setExpired(false);
        tokenRepository.save(token);
    }

    @Override
    public AppUser getAppUser(Principal secureUser) {
        SecureUser user = (SecureUser)
                ((UsernamePasswordAuthenticationToken)secureUser).getPrincipal();
        return user.getAppUser();
    }

    @Override
    public AppUser authenticate(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));
        String userEmail = authentication.getName();
        AppUser appUser = getAppUserByEmail(userEmail);
        checkIfAppUserIsEnabled(appUser);
        return appUser;
    }

    private AppUser getAppUserByEmail(String email){
        return appUserRepository.findByEmail(email).orElseThrow(
                ()-> new UsernameNotFoundException("User not found"));
    }

    private void checkIfAppUserIsEnabled(AppUser appUser) {
        if(!appUser.getIsEnabled())
            throw new FeedbackServiceException("User is not activated");
    }

    @Override
    public void revokeAllUserToken(AppUser appUser) {
        List<Token> validUserTokens = tokenRepository.findAllValidTokenByUser(appUser.getId());
        if(validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    @Override
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if(authHeader == null || !authHeader.startsWith("Bearer "))
            return;
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        extracted(response, userEmail, refreshToken);
    }

    private void extracted(HttpServletResponse response, String userEmail, String refreshToken) throws IOException {
        if(userEmail != null){
            AppUser appUser = getAppUserByEmail(userEmail);
            validateToken(response, userEmail, refreshToken, appUser);
        }
    }

    private void validateToken(HttpServletResponse response, String userEmail, String refreshToken, AppUser appUser) throws IOException {
        if(jwtService.isValidToken(refreshToken, userEmail)){
            HashMap<String, Object> claims = getClaims(appUser);
            String accessToken = jwtService.generateAccessToken(claims, userEmail);
            revokeAllUserToken(appUser);
            saveToken(appUser, accessToken);
            var jwtResponse = JwtResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();
            new ObjectMapper().writeValue(response.getOutputStream(), jwtResponse);
        }
    }

    @Override
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    @Override
    public AppUser saveAppUser(AppUser appUser) {
        return appUserRepository.save(appUser);
    }
}
