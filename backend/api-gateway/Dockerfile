# ==========================
# BUILD STAGE
# ==========================

FROM eclipse-temurin:25-jdk AS build

WORKDIR /app

COPY . .

RUN ./gradlew clean build -x test


# ==========================
# RUN STAGE
# ==========================

FROM eclipse-temurin:25-jre

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java","-jar","app.jar"]