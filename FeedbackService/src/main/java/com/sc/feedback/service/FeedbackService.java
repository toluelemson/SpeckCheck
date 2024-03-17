package com.sc.feedback.service;

import com.sc.feedback.data.dto.FeedbackDto;
import com.sc.feedback.data.dto.FeedbackRequestDto;
import com.sc.feedback.data.dto.ResponseDto;
import com.sc.user.model.AppUser;
import jakarta.validation.Valid;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public interface FeedbackService {
    ResponseDto submitFeedback(@Valid FeedbackDto inputFeedback, UUID requestId);

    ResponseDto requestFeedback(@Valid FeedbackRequestDto feedbackRequest, String clientHost, String referer);

    void deleteRequestById(UUID requestId);

    void deleteFeedbackById(UUID feedbackId);
    ResponseDto findFeedbackById(UUID userId);
    ResponseDto getAllFeedbackRequestsByUser(AppUser user);

    ResponseDto getRequestById(String requestId);

    ResponseDto updateRequestById(UUID feedbackId, FeedbackRequestDto updatedMessage);

    Object handleFeedbackServiceException(Exception ex);

    Object getAllFeedbacksByRequestId(UUID id);
}
