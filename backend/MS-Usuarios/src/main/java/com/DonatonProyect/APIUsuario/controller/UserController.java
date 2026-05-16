package com.DonatonProyect.APIUsuario.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.DonatonProyect.APIUsuario.dto.LoginDTO;
import com.DonatonProyect.APIUsuario.dto.LoginResponse;
import com.DonatonProyect.APIUsuario.dto.UserDTO;
import com.DonatonProyect.APIUsuario.entity.User;
import com.DonatonProyect.APIUsuario.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // CREATE
    @Operation(
        summary = "Registrar usuario",
        description = "Crea un nuevo usuario en el sistema."
    )
    @ApiResponse(responseCode = "200", description = "Usuario registrado exitosamente")
    @PostMapping
    public User registrar(
        @org.springframework.web.bind.annotation.RequestBody UserDTO userDTO
    ) {
        return userService.registrar(userDTO);
    }

    // READ - listar todos
    @GetMapping
    public List<User> listar() {
        return userService.listaUsers();
    }

    // READ - por ID
    @GetMapping("/{id}")
    public User buscar(@PathVariable Long id) {
        return userService.buscar(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public User actualizar(
            @PathVariable Long id,
            @org.springframework.web.bind.annotation.RequestBody UserDTO userDTO) {

        return userService.actualizar(id, userDTO);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        userService.eliminar(id);
    }

    // LOGIN
    @PostMapping("/login")
    public LoginResponse login(
        @org.springframework.web.bind.annotation.RequestBody LoginDTO loginDTO
    ) {
        return userService.login(
                loginDTO.getEmail(),
                loginDTO.getPassword());
    }
}