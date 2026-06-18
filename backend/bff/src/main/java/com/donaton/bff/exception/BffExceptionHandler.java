package com.donaton.bff.exception;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import java.util.Map;

@RestControllerAdvice
public class BffExceptionHandler {

    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<?> handleClientError(
            HttpClientErrorException ex
    ) {
        return ResponseEntity
                .status(ex.getStatusCode())
                .body(
                        Map.of(
                                "service",
                                "bff",
                                "message",
                                ex.getResponseBodyAsString(),
                                "status",
                                ex.getStatusCode().value()
                        )
                );
    }

    @ExceptionHandler(HttpServerErrorException.class)
    public ResponseEntity<?> handleServerError(
            HttpServerErrorException ex
    ) {
        return ResponseEntity
                .status(
                        HttpStatus.INTERNAL_SERVER_ERROR
                )
                .body(
                        Map.of(
                                "service",
                                "bff",
                                "message",
                                "Error interno del servicio",
                                "status",
                                500
                        )
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneric(
            Exception ex
    ) {
        return ResponseEntity
                .status(500)
                .body(
                        Map.of(
                                "service",
                                "bff",
                                "message",
                                    ex.getMessage(),
                                "status",
                                500
                        )
                );
    }
}
