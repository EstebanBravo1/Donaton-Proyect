package com.DonatonProyect.Bff.client.impl;

import com.DonatonProyect.Bff.client.DonationServiceClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class DonationServiceClientImpl implements DonationServiceClient {

    private final RestTemplate restTemplate;
    private final String donationServiceUrl;

    public DonationServiceClientImpl(
            RestTemplate restTemplate,
            @Value("${donation.service.url}") String donationServiceUrl) {
        this.restTemplate = restTemplate;
        this.donationServiceUrl = donationServiceUrl;
    }

    @Override
    public ResponseEntity<Object> createDonation(Object request) {
        String url = UriComponentsBuilder.fromUriString(donationServiceUrl)
                .path("/donations")
                .toUriString();
        return exchange(url, HttpMethod.POST, request);
    }

    private ResponseEntity<Object> exchange(String url, HttpMethod method, Object body) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> entity = new HttpEntity<>(body, headers);
        return restTemplate.exchange(url, method, entity, Object.class);
    }
}
