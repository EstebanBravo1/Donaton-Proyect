package com.DonatonProyect.Bff.client;

import org.springframework.http.ResponseEntity;

public interface UserServiceClient {
    
    ResponseEntity<Object> registerUser(Object request);
    
    ResponseEntity<Object> loginUser(Object request);
    
    ResponseEntity<Object> getUserById(Long id);
}
