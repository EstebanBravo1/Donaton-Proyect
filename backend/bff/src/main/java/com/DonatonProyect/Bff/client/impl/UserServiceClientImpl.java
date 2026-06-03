package com.DonatonProyect.Bff.client.impl;

import com.DonatonProyect.Bff.client.UserServiceClient;
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
public class UserServiceClientImpl implements UserServiceClient {

    private final RestTemplate restTemplate;
    private final String userServiceUrl;

    public UserServiceClientImpl(
            RestTemplate restTemplate,
            @Value("${user.service.url}") String userServiceUrl) {
        this.restTemplate = restTemplate;
        this.userServiceUrl = userServiceUrl;
    }

    @Override
    public ResponseEntity<Object> registerUser(Object request) {
        String url = UriComponentsBuilder.fromUriString(userServiceUrl)
                .path("/api/users")
                .toUriString();
        return exchange(url, HttpMethod.POST, request);
    }

    @Override
    public ResponseEntity<Object> loginUser(Object request) {
        String url = UriComponentsBuilder.fromUriString(userServiceUrl)
                .path("/api/users/login")
                .toUriString();
        return exchange(url, HttpMethod.POST, request);
    }

    @Override
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
