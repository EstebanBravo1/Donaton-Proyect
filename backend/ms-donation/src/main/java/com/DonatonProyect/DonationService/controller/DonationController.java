package com.DonatonProyect.DonationService.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // CREATE
    @PostMapping
    public ResponseEntity<DonationResponse> create(
            @Valid @RequestBody DonationRequest request) {

        return ResponseEntity.ok(service.createDonation(request));
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<DonationResponse>> getAll() {
        return ResponseEntity.ok(service.getAllDonations());
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<DonationResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getDonationById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<DonationResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody DonationRequest request) {

        return ResponseEntity.ok(service.updateDonation(id, request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {

        service.deleteDonation(id);

        return ResponseEntity.ok("Donación eliminada correctamente");
    }
}