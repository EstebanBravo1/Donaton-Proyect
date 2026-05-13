package com.DonatonProyect.APIUsuario.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DonatonProyect.APIUsuario.dto.LoginDTO;
import com.DonatonProyect.APIUsuario.dto.LoginResponse;
import com.DonatonProyect.APIUsuario.dto.UserDTO;
import com.DonatonProyect.APIUsuario.entity.User;
import com.DonatonProyect.APIUsuario.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    // CREATE
    @Operation(
        summary = "Registrar usuario",
        description = "Crea un nuevo usuario en el sistema."
    )
    @ApiResponse(responseCode = "200", description = "Usuario registrado exitosamente")
    @PostMapping
    public User registrar(
        @RequestBody(description = "Datos del nuevo usuario") 
        @org.springframework.web.bind.annotation.RequestBody UserDTO userDTO
    ) {
        return userService.registrar(userDTO);
    }

    // READ - listar todos
    @Operation(
        summary = "Listar usuarios",
        description = "Devuelve una lista con todos los usuarios registrados."
    )
    @ApiResponse(responseCode = "200", description = "Usuarios obtenidos correctamente")
    @GetMapping
    public List<User> listar() {
        return userService.listaUsers();
    }

    // READ - por ID
    @Operation(
        summary = "Buscar usuario por ID",
        description = "Devuelve un usuario específico según su ID."
    )
    @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    @GetMapping("/{id}")
    public User buscar(
        @Parameter(description = "ID del usuario a buscar") 
        @PathVariable Long id
    ) {
        return userService.buscar(id);
    }

    // UPDATE - por ID
    @Operation(
        summary = "Actualizar usuario",
        description = "Modifica los datos de un usuario según su ID."
    )
    @ApiResponse(responseCode = "200", description = "Usuario actualizado correctamente")
    @PutMapping("/{id}")
    public User actualizar(
        @Parameter(description = "ID del usuario a actualizar")
        @PathVariable Long id,

        @RequestBody(description = "Nuevos datos del usuario") 
        @org.springframework.web.bind.annotation.RequestBody UserDTO userDTO
    ) {
        return userService.actualizar(id, userDTO);
    }

    // DELETE - por ID
    @Operation(
        summary = "Eliminar usuario",
        description = "Elimina un usuario del sistema."
    )
    @ApiResponse(responseCode = "200", description = "Usuario eliminado correctamente")
    @DeleteMapping("/{id}")
    public void eliminar(
        @Parameter(description = "ID del usuario a eliminar")
        @PathVariable Long id
    ) {
        userService.eliminar(id);
    }

    // LOGIN
    @Operation(
        summary = "Iniciar sesión",
        description = "Valida las credenciales del usuario y retorna sus datos."
    )
    @ApiResponse(responseCode = "200", description = "Login exitoso")
    @ApiResponse(responseCode = "401", description = "Credenciales incorrectas")
    @PostMapping("/login")
    public LoginResponse login(
        @RequestBody(description = "Correo y contraseña del usuario") 
        @org.springframework.web.bind.annotation.RequestBody LoginDTO loginDTO
    ) {
        return userService.login(loginDTO.getEmail(), loginDTO.getPassword());
    }

}
