package com.DonatonProyect.DonationService.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.DonatonProyect.DonationService.client.UserClient;
import com.DonatonProyect.DonationService.dto.DonationRequest;
import com.DonatonProyect.DonationService.dto.DonationResponse;
import com.DonatonProyect.DonationService.model.Donation;
import com.DonatonProyect.DonationService.model.DonationStatus;
import com.DonatonProyect.DonationService.model.DonorType;
import com.DonatonProyect.DonationService.model.ResourceType;
import com.DonatonProyect.DonationService.repository.DonationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository repository;
    private final UserClient userClient;

    public DonationResponse createDonation(DonationRequest request) {

        // Validar donante
        Object user = userClient.getUserById(request.getDonorId());

        if (user == null) {
            throw new RuntimeException("Donante no encontrado");
        }

        // Crear entidad
        Donation donation = Donation.builder()
                .donorId(request.getDonorId())
                .donorType(DonorType.valueOf(request.getDonorType()))
                .resourceType(ResourceType.valueOf(request.getResourceType()))
                .amount(request.getAmount())
                .description(request.getDescription())
                .status(DonationStatus.PENDIENTE)
                .createdAt(LocalDateTime.now())
                .build();

        repository.save(donation);

        return DonationResponse.builder()
                .id(donation.getId())
                .status(donation.getStatus().name())
                .message("Donación registrada correctamente")
                .build();
    }
}
