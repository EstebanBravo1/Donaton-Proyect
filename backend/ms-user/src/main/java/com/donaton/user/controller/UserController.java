package com.donaton.user.controller;

import com.donaton.user.dto.UserAuthResponse;
import com.donaton.user.dto.UserCreateRequest;
import com.donaton.user.dto.UserResponse;
import com.donaton.user.dto.UserUpdateRequest;
import com.donaton.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse create (
            @Valid
            @RequestBody UserCreateRequest request
            ) {
        return service.create(request);
    }

    @GetMapping
    public List<UserResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public UserResponse findById(
            @PathVariable Long id
    ) {
        return service.findById(id);
    }

    @PutMapping("/{id}")
    public UserResponse update(
            @PathVariable Long id,
            @RequestBody UserUpdateRequest request
            ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @PathVariable Long id
    ) {
        service.delete(id);
    }

    @GetMapping("/auth/{email}")
    public UserAuthResponse findAuth(
            @PathVariable String email
    ) {
        return service.findAuthByEmail(email);
    }
}
