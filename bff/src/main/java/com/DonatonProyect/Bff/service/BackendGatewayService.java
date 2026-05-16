package com.DonatonProyect.Bff.service;

import com.DonatonProyect.Bff.dto.RegisterRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@Service
public class BackendGatewayService {

    private final RestTemplate restTemplate;
    private final String userServiceUrl;
    private final String donationServiceUrl;

    public BackendGatewayService(
            RestTemplate restTemplate,
            @Value("${user.service.url}") String userServiceUrl,
            @Value("${donation.service.url}") String donationServiceUrl) {
        this.restTemplate = restTemplate;
        this.userServiceUrl = userServiceUrl;
        this.donationServiceUrl = donationServiceUrl;
    }

    public ResponseEntity<Object> registerUser(Object body) {
        String url = UriComponentsBuilder.fromUriString(userServiceUrl)
                .path("/api/users")
                .toUriString();
        if (body instanceof RegisterRequest request) {
            Map<String, Object> payload = new HashMap<>();

            payload.put("name", request.getFullName());
            payload.put("email", request.getEmail());
            payload.put("password", request.getPassword());
            
            payload.put("phone", "No especificado");
            payload.put("address", "No especificada");
            payload.put("region", "No especificada");
            payload.put("comuna", "No especificada");
            return exchange(url, HttpMethod.POST, payload);
        }
        return exchange(url, HttpMethod.POST, body);
    }

    public ResponseEntity<Object> loginUser(Object body) {
        String url = UriComponentsBuilder.fromUriString(userServiceUrl)
                .path("/api/users/login")
                .toUriString();
        return exchange(url, HttpMethod.POST, body);
    }

    public ResponseEntity<Object> createDonation(Object body) {
        String url = UriComponentsBuilder.fromUriString(donationServiceUrl)
                .path("/donations")
                .toUriString();
        return exchange(url, HttpMethod.POST, body);
    }

    public ResponseEntity<Object> getUserById(Long id) {
        String url = UriComponentsBuilder.fromUriString(userServiceUrl)
                .path("/api/users/{id}")
                .buildAndExpand(id)
                .toUriString();
        return exchange(url, HttpMethod.GET, null);
    }

    private ResponseEntity<Object> exchange(String url, HttpMethod method, Object body) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> entity = new HttpEntity<>(body, headers);
        return restTemplate.exchange(url, method, entity, Object.class);
    }
}
