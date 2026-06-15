package com.donaton.user.dto;

public record UserAuthResponse(
        Long id,
        String email,
        String password,
        String role
) {
}
