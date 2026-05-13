package com.DonatonProyect.APIUsuario.service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.DonatonProyect.APIUsuario.dto.LoginResponse;
import com.DonatonProyect.APIUsuario.dto.UserDTO;
import com.DonatonProyect.APIUsuario.entity.User;
import com.DonatonProyect.APIUsuario.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // CREATE
    public User registrar(UserDTO dto) {

        if (repository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("El correo ya está registrado");
        }

        User user = User.builder()
            .email(dto.getEmail())
            .password(passwordEncoder.encode(dto.getPassword()))
            .role("USER")
            .name(dto.getName())
            .phone(dto.getPhone() != null ? dto.getPhone() : "")
            .address(dto.getAddress() != null ? dto.getAddress() : "")
            .region(dto.getRegion() != null ? dto.getRegion() : "")
            .comuna(dto.getComuna() != null ? dto.getComuna() : "")
            .build();

        return repository.save(user);
    }

    // READ - Listar todos los usuarios
    public List<User> listaUsers() {
        return repository.findAll();
    }

    // READ - buscar por ID
    public User buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    // READ - buscar por correo (para login y validaciones)
    public User buscarPorCorreo(String correo) {
        User user = repository.findByEmail(correo);
        if (user == null) {
            throw new RuntimeException("Usuario no encontrado");
        }
        return user;
    }

    // UPDATE
    public User actualizar(Long id, UserDTO dto) {

        User user = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setName(dto.getName());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());
        user.setRegion(dto.getRegion());
        user.setComuna(dto.getComuna());
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        return repository.save(user);
    }

    // DELETE
    public void eliminar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Usuario no existe");
        }
        repository.deleteById(id);
    }

    // LOGIN
    public LoginResponse login(String email, String password) {

        User usuario = buscarPorCorreo(email);

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            return new LoginResponse(false, "Contraseña incorrecta");
        }

        return new LoginResponse(true, "Login exitoso");
    }

}
