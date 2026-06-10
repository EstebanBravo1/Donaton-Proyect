package main.java.com.DonatonProyect.APIUsuario.dto;

public record UserResponse (

    Long id,
    String name,
    String email,
    String phone,
    String address,
    String region,
    String comuna,
    String role

) {}