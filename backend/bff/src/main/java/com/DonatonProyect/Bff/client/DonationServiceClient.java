package com.DonatonProyect.Bff.client;

import org.springframework.http.ResponseEntity;

public interface DonationServiceClient {
    
    ResponseEntity<Object> createDonation(Object request);
}
