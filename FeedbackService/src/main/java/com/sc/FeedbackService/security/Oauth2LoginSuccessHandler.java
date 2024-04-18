package com.sc.FeedbackService.security;

import com.sc.FeedbackService.appUser.model.AppUser;
import com.sc.FeedbackService.appUser.model.AuthProvider;
import com.sc.FeedbackService.appUser.model.UserRole;
import com.sc.FeedbackService.appUser.repository.AppUserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class Oauth2LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private final AppUserRepository appUserRepository;
    @Value("${frontend.url}")
    private String frontendUrl;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;
        if("google".equals(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId())){
            DefaultOAuth2User principal = (DefaultOAuth2User) authentication.getPrincipal();
            Collection<? extends GrantedAuthority> authorities = principal.getAuthorities();
            Map<String, Object> attributes = principal.getAttributes();
            String email = attributes.getOrDefault("email", "").toString();
            String name = attributes.getOrDefault("name", "").toString();
            appUserRepository.findByEmail(email)
                    .ifPresentOrElse( user ->{
                        authenticateUser(user, attributes, oAuth2AuthenticationToken);
                    }, () ->{
                        AppUser appUser = new AppUser();
                        appUser.setUserRole(UserRole.USER);
                        appUser.setEmail(email);
                        appUser.setFirstName(name);
                        appUser.setAuthProvider(AuthProvider.GOOGLE);
                        appUser.setIsEnabled(true);
                        AppUser savedAppUser = appUserRepository.save(appUser);
                        authenticateUser(savedAppUser, attributes, oAuth2AuthenticationToken);
                    });
        }
        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(frontendUrl);
        super.onAuthenticationSuccess(request, response, authentication);
    }

    private static void authenticateUser(AppUser user, Map<String, Object> attributes, OAuth2AuthenticationToken oAuth2AuthenticationToken) {
        DefaultOAuth2User newUser = new DefaultOAuth2User(List.of(new SimpleGrantedAuthority(user.getUserRole().name())),
                attributes, "id");
        Authentication auth = new OAuth2AuthenticationToken(newUser, List.of(new SimpleGrantedAuthority(user.getUserRole().name())),
                oAuth2AuthenticationToken.getAuthorizedClientRegistrationId());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }
}