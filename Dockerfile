FROM maven:3.8.4-openjdk-17-slim AS build

COPY FeedbackService/pom.xml ./pom.xml
COPY FeedbackService/src ./src

RUN mvn package -DskipTests

FROM openjdk:17-slim

COPY --from=build /target/feedback-service-*.jar /usr/app/feedback-service.jar

EXPOSE 8090

CMD ["java", "-jar", "/usr/app/feedback-service.jar"]
