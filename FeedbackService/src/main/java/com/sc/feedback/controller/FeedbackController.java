package com.sc.feedback.controller;

import com.sc.feedback.data.dto.FeedbackDto;
import com.sc.feedback.data.dto.FeedbackRequestDto;
import com.sc.feedback.data.dto.ResponseDto;
import com.sc.feedback.service.FeedbackService;
import com.sc.user.model.AppUser;
import com.sc.user.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @Autowired
    private final UserRepository userRepository;
//    private final KafkaTemplate<String, FeedbackEntity> kafkaFeedbackTemplate;

    @GetMapping("/hello")
    public String hello() {
        return "Hello world";
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/s/{id}")
    public ResponseDto submitFeedback(@Valid @RequestBody FeedbackDto feedback, @PathVariable("id") UUID requestId) {
        ResponseDto savedFeedback = feedbackService.submitFeedback(feedback, requestId);
        return savedFeedback;
    }

    @PostMapping("/request")
    public ResponseDto requestFeedback(@RequestBody @Valid FeedbackRequestDto feedback,
                                       @RequestHeader("Referer") String referer,
                                       @RequestHeader("Origin") String origin) {
//        String clientHost = request.getRemoteHost();
////        String clientHost = request.getRemoteHost();
//        if ("127.0.0.1".equals(clientHost) || "0:0:0:0:0:0:0:1".equals(clientHost)) {
//            clientHost = "localhost";
//        }
        return feedbackService.requestFeedback(feedback, origin, referer);
    }

    @DeleteMapping("/1/{id}")
    public String deleteFeedbackById(@PathVariable("id") UUID feedbackId) {
        feedbackService.deleteFeedbackById(feedbackId);
        return "Deleted successfully";
    }

    @DeleteMapping("/request/{id}")
    public String deleteRequestById(@PathVariable("id") UUID requestId) {

        log.info(String.valueOf(requestId));
        feedbackService.deleteRequestById(requestId);
        return "Deleted successfully";
    }

    @PutMapping("/request/{id}")
    public String editRequestById( @PathVariable("id") UUID requestId, @RequestBody @Valid FeedbackRequestDto updatedMessage ) {

        log.info(String.valueOf(requestId));
        feedbackService.updateRequestById( requestId, updatedMessage);
        return "Updated successfully";
    }

    @GetMapping("/request/{id}")
    public ResponseDto getRequestById( @PathVariable("id") String requestId) {
        log.info(String.valueOf(requestId));
        return feedbackService.getRequestById(requestId);
    }

    @GetMapping("/feedbacks/{id}")
    public ResponseEntity<ResponseDto> findFeedbackById(@PathVariable UUID id) {
        log.info("fetchFeedbackById: {}", id);
        ResponseDto feedback = feedbackService.findFeedbackById(id);
        return ResponseEntity.ok(feedback);
    }



    @GetMapping("/user/{userId}")
    public ResponseEntity<ResponseDto> getAllFeedbackRequestsByUser(@PathVariable UUID userId) {
        AppUser user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            // handle case where user not found
            ResponseDto errorResponse = new ResponseDto();
            errorResponse.setSuccess(false);
            errorResponse.setMessage("User not found with ID: " + userId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        ResponseDto feedbackRequestsResponse = feedbackService.getAllFeedbackRequestsByUser(user);

        if (feedbackRequestsResponse.isSuccess()) {
            return ResponseEntity.ok(feedbackRequestsResponse);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(feedbackRequestsResponse);
        }
    }

    @GetMapping("/all/{requestId}")
    @CrossOrigin(origins = "http://localhost:5173")
    public Object getAllFeedbacksByRequestId(@PathVariable("requestId") UUID requestId) {
        try {
        return feedbackService.getAllFeedbacksByRequestId(requestId);
//        if (feedbackDTOs.isEmpty()) {
//            // handle case where no feedbacks found for the request
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(feedbackDTOs);
    } catch (Exception ex) {
            return feedbackService.handleFeedbackServiceException(ex);
        }
    }
}

