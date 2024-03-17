package com.sc.feedback.Util;
import com.sc.feedback.data.dto.FeedbackDto;
import com.sc.feedback.data.dto.FeedbackRequestDto;
import com.sc.feedback.data.entities.FeedbackEntity;
import com.sc.feedback.data.entities.FeedbackRequestEntity;
import lombok.Data;
@Data
public class FeedbackMapper {
    public FeedbackRequestDto feedbackRequestToDTO(FeedbackRequestEntity inputFeedback) {

        FeedbackRequestDto dto = new FeedbackRequestDto();
        dto.setRequestId(inputFeedback.getRequestId());
//        dto.setFeedbacks(inputFeedback.getFeedbacks());
        dto.setRequestMessage(inputFeedback.getRequestMessage());
        dto.setRecipientName(inputFeedback.getRecipientName());
        dto.setRequestId(inputFeedback.getRequestId());
        dto.setRequestDate(inputFeedback.getRequestDate());
        dto.setFeedbackUrl(inputFeedback.getFeedbackUrl());

        return dto;
    }

    public FeedbackRequestEntity feedbackRequestToEntity(FeedbackRequestDto inputFeedback) {
        FeedbackRequestEntity requestEntity = new FeedbackRequestEntity();

        requestEntity.setRequestId(inputFeedback.getRequestId());
        requestEntity.setRequestMessage(inputFeedback.getRequestMessage());
        requestEntity.setRecipientName(inputFeedback.getRecipientName());
        requestEntity.setRequestId(inputFeedback.getRequestId());
//        requestEntity.setFeedbacks(inputFeedback.getFeedbacks());
        requestEntity.setRequestDate(inputFeedback.getRequestDate());
//        requestEntity.setUser(inputFeedback.getUsers());
        return requestEntity;
    }
    public static FeedbackEntity feedbackDtoToEntity(FeedbackDto feedbackDto) {
        FeedbackEntity feedbackEntity = new FeedbackEntity();
        feedbackEntity.setSenderMessage(feedbackDto.getSenderMessage());
        feedbackEntity.setSenderMessage2(feedbackDto.getSenderMessage2());
        feedbackEntity.setSenderName(feedbackDto.getSenderName());
        feedbackEntity.setFeedbackDate(feedbackDto.getFeedbackDate());

        return feedbackEntity;
    }
}