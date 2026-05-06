package com.DonatonProyect.DonationService.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DonationResponse {

    private Long id;
    private String status;
    private String message;

}
