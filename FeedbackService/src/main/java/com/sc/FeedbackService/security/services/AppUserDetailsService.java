package com.sc.FeedbackService.security.services;

import com.sc.FeedbackService.appUser.model.AppUser;
import com.sc.FeedbackService.appUser.repository.AppUserRepository;
import com.sc.FeedbackService.security.SecureUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
    private final AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    final AppUser appUser = appUserRepository.findByEmail(email).orElseThrow(
            ()-> new UsernameNotFoundException("User with this email not found"));
        return new SecureUser(appUser);
    }
}
