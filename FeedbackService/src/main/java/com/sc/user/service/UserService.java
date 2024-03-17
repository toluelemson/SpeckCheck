package com.sc.user.service;

import com.sc.user.model.AppUser;
import com.sc.user.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Data
public class UserService implements UserDetailsService {
    private final static String USER_NOT_FOUND = "user with email %s not found";
    private final UserRepository userRepository;

    @Override
    public AppUser loadUserByUsername(String email) throws UsernameNotFoundException {
        if (email == null || email.isEmpty()) {
            throw new UsernameNotFoundException("Email cannot be null or empty");
        }

       return userRepository.findByEmail(email);

    }
}
