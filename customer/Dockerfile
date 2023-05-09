FROM eclipse-temurin:17-jdk-alpine
EXPOSE 8082
ADD target/customer-0.0.1-SNAPSHOT.jar customer-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/customer-0.0.1-SNAPSHOT.jar"]