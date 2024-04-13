package com.sc.FeedbackService.exception;

public class AlreadyExistsException extends FeedbackServiceException{
    public AlreadyExistsException(String message) {
        super(message);
    }
}
