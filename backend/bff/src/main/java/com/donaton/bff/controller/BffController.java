package com.donaton.bff.controller;

import com.donaton.bff.dto.DonationRequest;
import com.donaton.bff.dto.LoginRequest;
import com.donaton.bff.dto.RegisterRequest;
import com.donaton.bff.service.BackendGatewayService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class BffController {

    private final BackendGatewayService backendGatewayService;

    public BffController(BackendGatewayService backendGatewayService) {
        this.backendGatewayService = backendGatewayService;
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@Valid @RequestBody RegisterRequest request) {
        return backendGatewayService.registerUser(request);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginRequest request) {
        return backendGatewayService.loginUser(request);
    }

    @PostMapping("/donations")
    public ResponseEntity<Object> createDonation(@Valid @RequestBody DonationRequest request) {
        return backendGatewayService.createDonation(request);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Long id) {
        return backendGatewayService.getUserById(id);
    }

    @PostMapping("/validate")
    public ResponseEntity<Object> validate(
            @RequestHeader("Authorization")
            String authorization
    ){
        return backendGatewayService.validateToken(
                authorization
        );
    }

}
