package com.DonatonProyect.DonationService.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DonatonProyect.DonationService.dto.DonationRequest;
import com.DonatonProyect.DonationService.dto.DonationResponse;
import com.DonatonProyect.DonationService.service.DonationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/donations")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService service;

    @PostMapping
    public ResponseEntity<DonationResponse> create(
        @Valid @RequestBody DonationRequest request) {
            return ResponseEntity.ok(service.createDonation(request));
        }
}
