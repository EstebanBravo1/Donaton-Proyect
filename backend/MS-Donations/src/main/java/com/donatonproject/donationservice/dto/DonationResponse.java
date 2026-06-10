package com.donatonproject.donationservice.dto;

import java.time.LocalDateTime;

import com.donatonproject.donationservice.model.DonationStatus;
import com.donatonproject.donationservice.model.DonorType;
import com.donatonproject.donationservice.model.ResourceType;

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