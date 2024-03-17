package com.sc.moderationservice.controller;

import com.sc.moderationservice.dto.ModerationDto;
import com.sc.moderationservice.service.ModerationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/")
public class ModerationController {

    private final ModerationService moderationService;
   @PostMapping(value = "/moderation", produces = {"application/json"}, consumes ={"application/json"})
    public ResponseEntity<ModerationDto> moderateFeedback(ModerationDto moderationDto) {
        return ResponseEntity.ok().body(moderationService.moderateFeedback(moderationDto));
    }

}
