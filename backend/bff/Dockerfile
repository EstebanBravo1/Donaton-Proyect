# Build stage
FROM gradle:8.7-jdk25 AS build

WORKDIR /app

COPY . .

RUN gradle clean build -x test

# Runtime stage
FROM eclipse-temurin:25-jdk

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]