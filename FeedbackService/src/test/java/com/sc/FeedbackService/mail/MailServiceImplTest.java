package com.sc.FeedbackService.mail;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MailServiceImplTest {
    @Autowired MailService mailService;

    @Test
    void sendMail() {
        String to = "testing@gmail.com";
        String subject = "Spring boot application";
        String content = "<p>This is just testing</p>";
        mailService.sendMail(to, subject, content);
    }
}