package com.DonatonProyect.Bff.service;

import com.DonatonProyect.Bff.client.DonationServiceClient;
import com.DonatonProyect.Bff.client.UserServiceClient;
import com.DonatonProyect.Bff.dto.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class BackendGatewayService {

    private final UserServiceClient userServiceClient;
    private final DonationServiceClient donationServiceClient;

    public BackendGatewayService(
            UserServiceClient userServiceClient,
            DonationServiceClient donationServiceClient) {
        this.userServiceClient = userServiceClient;
        this.donationServiceClient = donationServiceClient;
    }

    public ResponseEntity<Object> registerUser(Object body) {
        if (body instanceof RegisterRequest request) {
            Map<String, Object> payload = transformRegisterRequest(request);
            return userServiceClient.registerUser(payload);
        }
        return userServiceClient.registerUser(body);
    }

    public ResponseEntity<Object> loginUser(Object body) {
        return userServiceClient.loginUser(body);
    }

    public ResponseEntity<Object> createDonation(Object body) {
        return donationServiceClient.createDonation(body);
    }

    public ResponseEntity<Object> getUserById(Long id) {
        return userServiceClient.getUserById(id);
    }

    private Map<String, Object> transformRegisterRequest(RegisterRequest request) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("name", request.getFullName());
        payload.put("email", request.getEmail());
        payload.put("password", request.getPassword());
        payload.put("phone", "No especificado");
        payload.put("address", "No especificada");
        payload.put("region", "No especificada");
        payload.put("comuna", "No especificada");
        return payload;
    }
}
