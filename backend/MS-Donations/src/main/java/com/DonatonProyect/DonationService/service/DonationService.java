package com.DonatonProyect.DonationService.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.DonatonProyect.DonationService.dto.DonationRequest;
import com.DonatonProyect.DonationService.dto.DonationResponse;
import com.DonatonProyect.DonationService.model.Donation;
import com.DonatonProyect.DonationService.model.DonationStatus;
import com.DonatonProyect.DonationService.repository.DonationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository repository;

    // CREATE
    public DonationResponse createDonation(DonationRequest request) {

        Donation donation = Donation.builder()
                .donorId(request.getDonorId())
                .donorType(request.getDonorType())
                .resourceType(request.getResourceType())
                .amount(request.getAmount())
                .description(request.getDescription())
                .status(DonationStatus.PENDIENTE)
                .createdAt(LocalDateTime.now())
                .build();

        Donation saved = repository.save(donation);

        return mapToResponse(saved);
    }

    // READ ALL
    public List<DonationResponse> getAllDonations() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // READ BY ID
    public DonationResponse getDonationById(Long id) {

        Donation donation = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Donación no encontrada"));

        return mapToResponse(donation);
    }

    // UPDATE
    public DonationResponse updateDonation(Long id, DonationRequest request) {

        Donation donation = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Donación no encontrada"));

        donation.setDonorType(request.getDonorType());
        donation.setResourceType(request.getResourceType());
        donation.setAmount(request.getAmount());
        donation.setDescription(request.getDescription());
        donation.setStatus(request.getStatus());

        Donation updated = repository.save(donation);

        return mapToResponse(updated);
    }

    // DELETE
    public void deleteDonation(Long id) {

        Donation donation = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Donación no encontrada"));

        repository.delete(donation);
    }

    // MAPPER
    private DonationResponse mapToResponse(Donation donation) {

        return DonationResponse.builder()
                .id(donation.getId())
                .donorId(donation.getDonorId())
                .donorType(donation.getDonorType())
                .resourceType(donation.getResourceType())
                .amount(donation.getAmount())
                .description(donation.getDescription())
                .status(donation.getStatus())
                .createdAt(donation.getCreatedAt())
                .build();
    }
}