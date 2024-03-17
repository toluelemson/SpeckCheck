package com.sc.user.controller;
import com.sc.feedback.data.dto.ResponseDto;
import com.sc.user.dto.AuthenticationRequestDto;
import com.sc.user.dto.RegistrationRequestDto;
import com.sc.user.service.AuthenticationService;
import com.sc.feedback.Util.CustomError.UserAlreadyExistsException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequestDto request) {
        try {
            ResponseDto response = authenticationService.register(request);
            return ResponseEntity.ok(response);
        } catch (UserAlreadyExistsException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(
            @RequestBody AuthenticationRequestDto request, HttpServletResponse response
    ) {
        try {
            return ResponseEntity.ok(authenticationService.authenticate(request, response));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        return authenticationService.confirmToken(token);
    }
}
