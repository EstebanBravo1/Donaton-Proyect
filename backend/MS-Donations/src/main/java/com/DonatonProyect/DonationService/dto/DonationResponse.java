package com.DonatonProyect.DonationService.dto;

import java.time.LocalDateTime;

import com.DonatonProyect.DonationService.model.DonationStatus;
import com.DonatonProyect.DonationService.model.DonorType;
import com.DonatonProyect.DonationService.model.ResourceType;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DonationResponse {

    private Long id;
    private Long donorId;
    private DonorType donorType;
    private ResourceType resourceType;
    private Double amount;
    private String description;
    private DonationStatus status;
    private LocalDateTime createdAt;
}