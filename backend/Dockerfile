FROM eclipse-temurin:17-jdk-alpine
EXPOSE 8082
ADD target/spring-boot-service.jar spring-boot-service.jar
ENTRYPOINT ["java","-jar","/spring-boot-service.jar"]