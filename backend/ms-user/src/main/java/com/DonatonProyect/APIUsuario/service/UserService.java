package com.DonatonProyect.APIUsuario.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.DonatonProyect.APIUsuario.dto.UserAuthResponse;
import com.DonatonProyect.APIUsuario.dto.UserCreateRequest;
import com.DonatonProyect.APIUsuario.dto.UserResponse;
import com.DonatonProyect.APIUsuario.entity.User;
import com.DonatonProyect.APIUsuario.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    public UserResponse crear(UserCreateRequest request) {
        if(repository.existsByEmail(request.email())) {
            throw new RunTimeException("Email ya registrado");
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(request.password())
                .role("USER")
                .phone(request.phone())
                .address(request.address())
                .region(request.region())
                .comuna(request.comuna())
                .build();
        
        User saved = repository.save(user);

        return map(saved);
    }

    public List<UserResponse> listar() {

        return repository.findAll()
                .stream()
                .map(this::map)
                .toList();
    }

    public UserResponse buscar(Long id) {
        User user = repository.findById(id)
                .orElseThrow(
                    () -> new RuntimeException("Usuario no encontrado")
                );
        return map(user);
    }
    
    public UserResponse actualizar(Long id, UserCreateRequest request){

        User user = repository.findById(id)
                .orElseThrow(
                    ()->new RuntimeException("Usuario no encontrado")
                );

        user.setName(request.name());
        user.setPhone(request.phone());
        user.setAddress(request.address());
        user.setRegion(request.region());
        user.setComuna(request.comuna());

        return map(repository.save(user));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    // Usado por Auth mediante BFF
    public UserAuthResponse buscarAuth(String email) {
        User user = repository.findByEmail(email);

        if(user == null) {
            throw new RunTimeException("Usuario no encontrado");
        }

        return new UserAuthResponse(
            user.getId(),
            user.getEmail(),
            user.getPassword(),
            user.getRole()
        );
    }

    private UserResponse map(User user) {
        return new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPhone(),
            user.getAddress(),
            user.getRegion(),
            user.getComuna(),
            user.getRole()
        );
    }
    
}
