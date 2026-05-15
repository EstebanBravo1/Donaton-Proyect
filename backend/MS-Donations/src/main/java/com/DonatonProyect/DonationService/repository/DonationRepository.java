package com.DonatonProyect.DonationService.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DonatonProyect.DonationService.model.Donation;

public interface DonationRepository extends JpaRepository<Donation, Long> {

}
