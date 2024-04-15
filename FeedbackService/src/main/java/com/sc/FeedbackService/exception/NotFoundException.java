package com.sc.FeedbackService.exception;

public class NotFoundException extends FeedbackServiceException{
    public NotFoundException(String message) {
        super(message);
    }
}
