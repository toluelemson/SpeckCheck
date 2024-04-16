package com.sc.FeedbackService.handler;

import com.sc.FeedbackService.exception.AlreadyExistsException;
import com.sc.FeedbackService.exception.FeedbackServiceException;
import com.sc.FeedbackService.exception.NotFoundException;
import com.sc.FeedbackService.exception.VerificationException;
import jakarta.validation.Constraint;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FeedbackServiceException.class)
    public ResponseEntity<?> handleException(FeedbackServiceException exception){
        return ResponseEntity
                .badRequest()
                .body(exception.getMessage());
    }

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<?> handleException(AlreadyExistsException exception){
        return ResponseEntity
                .badRequest()
                .body(exception.getMessage());
    }

    @ExceptionHandler(VerificationException.class)
    public ResponseEntity<?> handleException(VerificationException exception){
        return ResponseEntity
                .badRequest()
                .body(exception.getMessage());
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleException(AuthenticationException exception){
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(exception.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleException(NotFoundException exception){
        return ResponseEntity
                .notFound()
                .build();
    }
}
