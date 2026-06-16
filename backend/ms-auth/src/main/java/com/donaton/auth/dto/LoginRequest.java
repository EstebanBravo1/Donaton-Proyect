package com.donaton.auth.dto;

public record LoginRequest(
        String email,
        String password
) {
}
