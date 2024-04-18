package com.sc.FeedbackService.handler;

import com.sc.FeedbackService.exception.AlreadyExistsException;
import com.sc.FeedbackService.exception.FeedbackServiceException;
import com.sc.FeedbackService.exception.NotFoundException;
import com.sc.FeedbackService.exception.VerificationException;
import jakarta.validation.Constraint;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FeedbackServiceException.class)
    public ResponseEntity<?> handleException(FeedbackServiceException exception){
        return ResponseEntity
                .badRequest()
                .body(buildErrorResponse(exception));
    }

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<?> handleException(AlreadyExistsException exception){
        return ResponseEntity
                .badRequest()
                .body(buildErrorResponse(exception));
    }

    @ExceptionHandler(VerificationException.class)
    public ResponseEntity<?> handleException(VerificationException exception){
        return ResponseEntity
                .badRequest()
                .body(buildErrorResponse(exception));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleException(AuthenticationException exception){
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(buildErrorResponse(exception));
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> handleException(UsernameNotFoundException exception){
        return ResponseEntity
                .badRequest()
                .body(buildErrorResponse(exception));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleException(BadCredentialsException exception){
        return ResponseEntity
                .badRequest()
                .body(buildErrorResponse(exception));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleException(MethodArgumentNotValidException exception){
        return ResponseEntity
                .badRequest().body(
                        ErrorResponse.builder()
                                .message(exception.getFieldErrors()
                                        .stream()
                                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                                        .collect(Collectors.joining(",")))
                                .time(LocalDateTime.now())
                                .build());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleException(NotFoundException exception){
        return ResponseEntity
                .notFound()
                .build();
    }

    private static ErrorResponse buildErrorResponse(Exception exception){
        return ErrorResponse.builder()
               .message(exception.getMessage())
               .time(LocalDateTime.now())
               .build();
    }
}
