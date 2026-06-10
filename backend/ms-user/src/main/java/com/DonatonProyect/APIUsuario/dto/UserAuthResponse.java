package main.java.com.DonatonProyect.APIUsuario.dto;

public record UserAuthResponse(

    Long id,
    String email,
    String password,
    String role
    
) {}