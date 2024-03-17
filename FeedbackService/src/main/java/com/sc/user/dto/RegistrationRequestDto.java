package com.sc.user.dto;
import com.sc.user.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RegistrationRequestDto {
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String password;
    private UserRole userRole;
}
