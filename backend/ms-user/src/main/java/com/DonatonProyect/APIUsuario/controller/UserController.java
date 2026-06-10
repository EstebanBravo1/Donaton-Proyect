package main.java.com.DonatonProyect.APIUsuario.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import main.java.com.DonatonProyect.APIUsuario.dto.UserResponse;

import com.DonatonProyect.APIUsuario.dto.*;
import com.DonatonProyect.APIUsuario.repository.UserRepository;
import com.DonatonProyect.APIUsuario.service.UserService;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    public UserResponse crear(
        @RequestBody UserCreateRequest request
    ) {
        return service.crear(request);
    }

    @GetMapping
    public List<UserResponse> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public UserResponse buscar(
        @PathVariable Long id
    ) {
        return service.buscar(id);
    }

    @PutMapping("/{id}")
    public UserResponse actualizar(
        @PathVariable Long id,
        @RequestBody UserCreateRequest request
    ) {
        return service.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public void eliminar(
        @PathVariable Long id
    ) {
        service.eliminar(id);
    }

    // Endpoint interno para BFF/Auth
    @GetMapping("/internal/auth/{email}")
    public UserAuthResponse buscarAuth(
        @PathVariable String email
    ) {
        return service.buscarAuth(email);
    }

}
