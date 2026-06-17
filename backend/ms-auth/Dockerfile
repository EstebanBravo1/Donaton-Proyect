# =========================
# Etapa de compilación
# =========================

FROM gradle:8.14-jdk25 AS build

WORKDIR /app

COPY . .

RUN ./gradlew clean bootJar -x test


# =========================
# Etapa ejecución
# =========================

FROM eclipse-temurin:25-jre

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar


EXPOSE 8082


ENTRYPOINT [
    "java",
    "-jar",
    "app.jar"
]