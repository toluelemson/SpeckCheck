//package com.sc.config;
//import org.apache.kafka.clients.admin.NewTopic;
//import org.springframework.context.annotation.Bean;
//import org.springframework.kafka.config.TopicBuilder;
//public class KafkaTopicConfiguration {
//
//    @Bean
//    public NewTopic feedbackApprovedTopicCreation(){
//        return TopicBuilder.name("analyticsTopic")
//                .build();
//    }
//    @Bean
//    public NewTopic incomingNotificationTopicCreation(){
//        return TopicBuilder.name("notificationTopic")
//                .build();
//    }
//    @Bean
//    public NewTopic GivenFeedback(){
//        return TopicBuilder.name("GivenFeedbackTopic")
//                .build();
//    }
//
//    @Bean
//    public NewTopic UpdatedFeedback(){
//        return TopicBuilder.name("UpdatedFeedbackTopic")
//                .build();
//    }
//
//}
