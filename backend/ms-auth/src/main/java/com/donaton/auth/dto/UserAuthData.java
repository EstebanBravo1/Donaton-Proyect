package com.donaton.auth.dto;

public record UserAuthData(
        String email,
        String passwordHash,
        String role
) {
}
