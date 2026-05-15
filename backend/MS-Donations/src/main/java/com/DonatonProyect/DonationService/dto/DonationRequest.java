package com.DonatonProyect.DonationService.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DonationRequest {

    @NotNull
    private Long donorId;

    @NotNull
    private String donorType;

    @NotNull
    private String resourceType;

    private Double amount;

    private String description;

}
