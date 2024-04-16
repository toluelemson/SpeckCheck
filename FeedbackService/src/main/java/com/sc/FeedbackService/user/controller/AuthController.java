package com.sc.FeedbackService.user.controller;

import com.sc.FeedbackService.user.dto.request.AuthenticationRequest;
import com.sc.FeedbackService.user.dto.request.RegisterUserRequest;
import com.sc.FeedbackService.user.dto.response.RegisterUserResponse;
import com.sc.FeedbackService.user.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterUserRequest registerUserRequest){
        RegisterUserResponse response = authService.register(registerUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("confirm")
    public ResponseEntity<?> confirmToken(@RequestParam String token, @RequestParam String email){
        return ResponseEntity.ok(authService.confirmToken(token, email));
    }
    @PostMapping("login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthenticationRequest authenticationRequest){
        return ResponseEntity.ok(authService.authenticate(authenticationRequest));
    }

    @PostMapping("logout")
    public ResponseEntity<?> logout(){
        return ResponseEntity.ok("User logged out successfully");
    }
}
