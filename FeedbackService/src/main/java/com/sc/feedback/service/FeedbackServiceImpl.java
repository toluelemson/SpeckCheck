package com.sc.feedback.service;

import com.sc.feedback.Util.FeedbackMapper;
import com.sc.feedback.data.dto.FeedbackDto;
import com.sc.feedback.data.dto.FeedbackRequestDto;
import com.sc.feedback.data.dto.ResponseDto;
import com.sc.feedback.data.entities.FeedbackEntity;
import com.sc.feedback.data.entities.FeedbackRequestEntity;
import com.sc.feedback.repositories.FeedbackRepository;
import com.sc.feedback.repositories.FeedbackRequestRepository;
import com.sc.user.model.AppUser;
import com.sc.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Slf4j
public class FeedbackServiceImpl implements FeedbackService {
//    private final KafkaTemplate<String, FeedbackDto> kafkaFeedbackTemplate;
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private FeedbackRequestRepository feedbackRequestRepository;

    @Autowired
    private UserRepository userRepository;

    ResponseDto response = new ResponseDto();

//    @Value("${server.port}")
//    private String serverPort;

    public String getFrontendHost( String referer, String origin) {
        String host = (origin != null) ? origin : (referer != null) ? referer : "Unknown";
        return new String(host);
    }

    public AppUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            AppUser currentUser = userRepository.findByEmail(userDetails.getUsername());

            if (currentUser != null) {
                return currentUser;
            }
        }

        throw new IllegalStateException("No authenticated user or user details not available.");
    }

    @Override
    public ResponseDto submitFeedback(@Valid FeedbackDto inputFeedback, UUID requestId) {
        FeedbackMapper feedbackMapper = new FeedbackMapper();
        FeedbackRequestEntity requestEntity = feedbackRequestRepository.findByRequestId(requestId);

        if (inputFeedback == null) {
            FeedbackServiceImpl.log.error("Invalid or null feedback entity submitted");
            throw new IllegalArgumentException("Cannot submit invalid or null feedback");
        }

        if (requestEntity == null) {
            FeedbackServiceImpl.log.error("No existing feedback request with id: {}", requestId);
            throw new IllegalArgumentException("Cannot find feedback request with given id");
        }

        FeedbackEntity feedbackEntity = feedbackMapper.feedbackDtoToEntity(inputFeedback);

        if (inputFeedback.getSenderName() == null || inputFeedback.getSenderName().isEmpty()) {
            feedbackEntity.setSenderName("Anonymous");
        }
        feedbackEntity.setFeedbackId(UUID.randomUUID());
        feedbackEntity.setFeedbackDate(inputFeedback.getFeedbackDate());

        requestEntity.getFeedbacks().add(feedbackEntity);

        ResponseDto response = new ResponseDto();

        try {
            feedbackRequestRepository.save(requestEntity);
            FeedbackServiceImpl.log.info("Saved feedback: {}", feedbackEntity.getFeedbackId());
            response.setSuccess(true);
            response.setMessage("Feedback has been submitted successfully.");
            response.setData(Collections.singletonList(feedbackEntity));
        } catch (Exception e) {
            FeedbackServiceImpl.log.error("Error saving FeedbackEntity to repository", e);
            response.setSuccess(false);
            response.setMessage("Error saving feedback to repository: " + e.getMessage());
        }

        return response;
    }

    @Override
    public ResponseDto getRequestById(String requestId) {
        Optional<FeedbackRequestEntity> request = Optional.ofNullable(feedbackRequestRepository.findByRequestURLCode(requestId));

        FeedbackMapper feedbackMapper = new FeedbackMapper();
        FeedbackRequestDto requestUrlId = feedbackMapper.feedbackRequestToDTO(request.get());

        if (requestUrlId == null) {
            FeedbackServiceImpl.log.error("No existing feedback request with id: {}", request);
            throw new EntityNotFoundException("Cannot find feedback request with given id");
        }

        response.setSuccess(true);
        response.setMessage("Request found");
        response.setData(requestUrlId);

        return response;
    }

    @Override
    public ResponseDto updateRequestById(UUID requestId, FeedbackRequestDto message) {

        ResponseDto response = new ResponseDto();

        FeedbackRequestEntity existingFeedback = feedbackRequestRepository.findByRequestId(requestId);

        if (existingFeedback == null) {
            FeedbackServiceImpl.log.error("No existing feedback request with id: {}", requestId);
            response.setSuccess(false);
            response.setMessage("Cannot find feedback request with given id");
            return response;
        }

        try {
            // Update the fields of the existingFeedback using values from message
            existingFeedback.setRequestMessage(message.getRequestMessage());

            // Save the updated feedback to the database
            feedbackRequestRepository.save(existingFeedback);

            // Return success response
            response.setSuccess(true);
            response.setMessage("Feedback request updated successfully.");
        } catch (Exception e) {
            FeedbackServiceImpl.log.error("Error occurred during feedback request update: {}", e.getMessage(), e);
            response.setSuccess(false);
            response.setMessage("Error occurred during feedback request update: " + e.getMessage());
        }
        return response;
    }


    @Override
    public ResponseDto requestFeedback(@Valid FeedbackRequestDto feedbackRequest, String origin, String referer) {

        if (feedbackRequest == null) {
            response.setSuccess(false);
            response.setMessage("Feedback cannot be null");
        }

        FeedbackMapper feedbackMapper = new FeedbackMapper();

        List<FeedbackRequestEntity> existingRequest = feedbackRequestRepository.findByUser(getCurrentUser());

        if (!existingRequest.isEmpty()) {
            response.setSuccess(false);
            response.setMessage("You can only make one request for this user");
            return response;
        }

        try {
            FeedbackRequestEntity newRequest = feedbackMapper.feedbackRequestToEntity(feedbackRequest);
            newRequest.setRequestDate(Timestamp.from(Instant.now()));
            newRequest.setUser(getCurrentUser());
            newRequest.setRecipientName(getCurrentUser().getFirstName());
            newRequest.setFeedbackUrl(getFrontendHost(origin, referer));
            FeedbackRequestEntity savedEntity = feedbackRequestRepository.save(newRequest);
            FeedbackRequestDto savedRequest = feedbackMapper.feedbackRequestToDTO(savedEntity);
            FeedbackServiceImpl.log.info("Saved feedback: {}", savedRequest);
            response.setSuccess(true);
            response.setMessage("Feedback request has been saved successfully.");
            response.setData(savedRequest);
        } catch (Exception e) {
            response.setSuccess(false);
            response.setMessage("Error occurred during feedback request processing: " + e.getMessage());
            return response;
        }

        return response;
    }

    @Override
    public void deleteRequestById(UUID requestId){
        feedbackRequestRepository.deleteById(requestId);
        FeedbackServiceImpl.log.info("Deleted Request");
    }
    @Override
    public void deleteFeedbackById(UUID feedbackId) {
        try {
            feedbackRepository.deleteById(feedbackId);
            FeedbackServiceImpl.log.info("Deleted Feedback");
        } catch (DataIntegrityViolationException e) {
            FeedbackServiceImpl.log.error("Error deleting feedback with ID: " + feedbackId + ". It might be referenced by another entity.", e);
            // Handle or throw the exception as per your requirement
        }
    }

    @Override
    public ResponseDto findFeedbackById(UUID userId) {
        Optional<FeedbackEntity> feedbackEntityOptional = feedbackRepository.findById(userId);
        ResponseDto response = new ResponseDto();

        if (feedbackEntityOptional.isPresent()) {
            FeedbackEntity feedbackEntity = feedbackEntityOptional.get();
            response.setSuccess(true);
            response.setMessage("Feedback found successfully.");
            response.setData(feedbackEntity);
        } else {
            response.setSuccess(false);
            response.setMessage("Feedback not found with ID: " + userId);
        }

        return response;
    }

    @Override
    public ResponseDto getAllFeedbackRequestsByUser(@Valid AppUser user) {
        List<FeedbackRequestEntity> feedbackRequests = feedbackRequestRepository.findByUser(user);

        List<FeedbackRequestDto> feedbackRequestDTOs = feedbackRequests.stream()
                .map(request -> FeedbackRequestDto.builder()
                        .requestId(request.getRequestId())
                        .requestURLCode(request.getRequestURLCode())
                        .recipientName(request.getRecipientName())
                        .requestMessage(request.getRequestMessage())
                        .requestDate(request.getRequestDate())
                        .feedbackUrl(request.getFeedbackUrl())
                        .build())
                .collect(Collectors.toList());

        ResponseDto response = new ResponseDto();

        if (!feedbackRequests.isEmpty()) {
            response.setSuccess(true);
            response.setMessage("Feedback requests found successfully.");
            response.setData(feedbackRequestDTOs);
        } else {
            response.setSuccess(false);
            response.setMessage("No feedback requests found for the user.");
        }
        return response;
    }

    // Error handler
    public Object handleFeedbackServiceException(Exception ex) {
        // You can customize the error message and status code based on your requirements
        String errorMessage = "An error occurred while retrieving feedbacks.";
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity(errorMessage, status);
    }


//    @Override
//    public Object getAllFeedbacksByRequestId(UUID user) {
//        return null;
//    }

    @Override
    public Object getAllFeedbacksByRequestId(UUID id) {
        FeedbackRequestEntity requestFeedbacks = feedbackRequestRepository.findByRequestId(id);
//        FeedbackRequestEntity requestFeedbacks = feedbackRequestRepository.findByRequestURLCode(id);
//        log(requestFeedbacks.toString());
        if (requestFeedbacks == null) {
            String errorMessage = "Feedback request with ID " + id + " not found.";
            return new ResponseEntity(errorMessage, HttpStatus.NOT_FOUND);
        }

        List<FeedbackDto> feedbackDTO = requestFeedbacks.getFeedbacks().stream()
                .map(feedback -> FeedbackDto.builder()
                        .feedbackId(feedback.getFeedbackId())
                        .senderName(feedback.getSenderName())
                        .senderMessage(feedback.getSenderMessage())
                        .senderMessage2(feedback.getSenderMessage2())
                        .feedbackDate(feedback.getFeedbackDate())
                        .build())
                .collect(Collectors.toList());

        return feedbackDTO;
        }
    }


//    @KafkaListener(topics = "feedbackModerationTopic", groupId = "feedbackEventGroup")
//    public FeedbackEntity moderateFeedback(FeedbackDto feedbackDto) {
//        log.info("processModeratedFeedback");
//        FeedbackEntity approveIncoming = approveFeedback(feedbackDto);
//        return approveIncoming;
//    }




