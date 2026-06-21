package com.donaton.donation.controller;

import com.donaton.donation.dto.DonationRequest;
import com.donaton.donation.dto.DonationResponse;
import com.donaton.donation.service.DonationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donations")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DonationResponse create(
            @Valid
            @RequestBody DonationRequest request
            ) {
        return service.create(request);
    }

    @GetMapping
    public List<DonationResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public DonationResponse findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public DonationResponse update(
            @PathVariable Long id,
            @Valid
            @RequestBody DonationRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
