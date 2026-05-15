package com.DonatonProyect.DonationService.dto;

import com.DonatonProyect.DonationService.model.DonationStatus;
import com.DonatonProyect.DonationService.model.DonorType;
import com.DonatonProyect.DonationService.model.ResourceType;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DonationRequest {

    @NotNull
    private Long donorId;

    @NotNull
    private DonorType donorType;

    @NotNull
    private ResourceType resourceType;

    private Double amount;

    private String description;

    private DonationStatus status;
}