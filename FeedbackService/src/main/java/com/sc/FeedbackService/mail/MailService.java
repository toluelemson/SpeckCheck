package com.sc.FeedbackService.mail;

public interface MailService {
    void sendMail(String to, String subject, String htmlContent);
    String buildVerificationMail(String name, String link);
}
