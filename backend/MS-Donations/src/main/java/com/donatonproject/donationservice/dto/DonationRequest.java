package com.donatonproject.donationservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DonationRequest {

    @NotNull
    private Long donorId;

    @NotBlank
    private String resourceName;

    @NotBlank
    private String resourceType;

    @NotBlank
    private String donorType;

    @NotNull
    private Integer quantity;
}