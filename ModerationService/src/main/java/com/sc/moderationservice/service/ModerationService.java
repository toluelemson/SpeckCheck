package com.sc.moderationservice.service;

import com.sc.moderationservice.dto.FeedbackDto;
import com.sc.moderationservice.dto.ModerationDto;
import com.sc.moderationservice.model.Moderation;
import com.sc.moderationservice.repository.ModerationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ModerationService {

    @Autowired
    private ModerationRepository moderationRepository;
    private final KafkaTemplate<String, FeedbackDto> kafkaTemplate;

    public ModerationDto moderateFeedback (ModerationDto moderationDto) {
        Moderation moderation = mapToModeration(moderationDto);

        Moderation savedData = moderationRepository.save(moderation);

        FeedbackDto feedbackDto = new FeedbackDto();
        feedbackDto.setId(moderationDto.getFeedbackId());
        feedbackDto.setFeedbackStatus(moderationDto.getFeedbackStatus());

        kafkaTemplate.send("feedbackModerationTopic", feedbackDto);

        return mapToModerationDto(savedData);

    }
    private Moderation mapToModeration(ModerationDto moderationDto) {
        return Moderation.builder()
                .feedbackId(moderationDto.getFeedbackId())
                .moderatorId(moderationDto.getModeratorId())
                .date(moderationDto.getDate())
                .comments(moderationDto.getComments())
                .build();
    }

    private ModerationDto mapToModerationDto(Moderation moderation) {
        return ModerationDto.builder()
                .id(moderation.getId())
                .feedbackId(moderation.getFeedbackId())
                .moderatorId(moderation.getModeratorId())
                .date(moderation.getDate())
                .comments(moderation.getComments())
                .build();
    }
}
