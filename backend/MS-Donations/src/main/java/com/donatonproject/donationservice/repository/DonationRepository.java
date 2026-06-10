package com.donatonproject.donationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.donatonproject.donationservice.model.Donation;

public interface DonationRepository extends JpaRepository<Donation, Long> {

}
