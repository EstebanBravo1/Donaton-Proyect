package com.donaton.bff.service;

import com.donaton.bff.dto.AuthLoginRequest;
import com.donaton.bff.dto.LoginRequest;
import com.donaton.bff.dto.RegisterRequest;
import com.donaton.bff.dto.UserAuthData;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@Service
public class BackendGatewayService {

    private final RestTemplate restTemplate;

    private final String userServiceUrl;
    private final String authServiceUrl;
    private final String donationServiceUrl;

    public BackendGatewayService(
            RestTemplate restTemplate,
            @Value("${user.service.url}")
            String userServiceUrl,
            @Value("${auth.service.url}")
            String authServiceUrl,
            @Value("${donation.service.url}")
            String donationServiceUrl
    ){
        this.restTemplate = restTemplate;
        this.userServiceUrl = userServiceUrl;
        this.authServiceUrl = authServiceUrl;
        this.donationServiceUrl = donationServiceUrl;
    }

    public ResponseEntity<Object> registerUser(
            RegisterRequest request
    ){
        String url =
                UriComponentsBuilder
                        .fromUriString(userServiceUrl)
                        .path("/users")
                        .toUriString();
        Map<String,Object> payload =
                new HashMap<>();
        payload.put(
                "name",
                request.getFullName()
        );
        payload.put(
                "email",
                request.getEmail()
        );
        payload.put(
                "password",
                request.getPassword()
        );
        return exchange(
                url,
                HttpMethod.POST,
                payload
        );
    }

    public ResponseEntity<Object> loginUser(
            LoginRequest request
    ){
        String userUrl =
                UriComponentsBuilder
                        .fromUriString(userServiceUrl)
                        .path("/users/auth/{email}")
                        .buildAndExpand(
                                request.getEmail()
                        )
                        .toUriString();
        UserAuthData userData =
                restTemplate.getForObject(
                        userUrl,
                        UserAuthData.class
                );
        AuthLoginRequest authRequest =
                new AuthLoginRequest(
                        userData.email(),
                        request.getPassword(),
                        userData.passwordHash(),
                        userData.role()
                );
        String authUrl =
                UriComponentsBuilder
                        .fromUriString(authServiceUrl)
                        .path("/auth/login")
                        .toUriString();
        return exchange(
                authUrl,
                HttpMethod.POST,
                authRequest
        );
    }

    public ResponseEntity<Object> createDonation(
            Object body
    ){
        String url =
                UriComponentsBuilder
                        .fromUriString(donationServiceUrl)
                        .path("/donations")
                        .toUriString();

        return exchange(
                url,
                HttpMethod.POST,
                body
        );
    }

    public ResponseEntity<Object> getUserById(
            Long id
    ){
        String url =
                UriComponentsBuilder
                        .fromUriString(userServiceUrl)
                        .path("/users/{id}")
                        .buildAndExpand(id)
                        .toUriString();
        return exchange(
                url,
                HttpMethod.GET,
                null
        );
    }

    private ResponseEntity<Object> exchange(
            String url,
            HttpMethod method,
            Object body
    ){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(
                MediaType.APPLICATION_JSON
        );

        HttpEntity<Object> entity = new HttpEntity<>(
                        body,
                        headers
                );

        return restTemplate.exchange(
                url,
                method,
                entity,
                Object.class
        );
    }

    public ResponseEntity<Object> validateToken(
            String authorization
    ){
        String url = UriComponentsBuilder
                        .fromUriString(authServiceUrl)
                        .path("/auth/validate")
                        .toUriString();
        HttpHeaders headers = new HttpHeaders();
        headers.set(
                "Authorization",
                authorization
        );
        HttpEntity<Object> entity = new HttpEntity<>(
                        null,
                        headers
                );
        return restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                Object.class
        );
    }

}