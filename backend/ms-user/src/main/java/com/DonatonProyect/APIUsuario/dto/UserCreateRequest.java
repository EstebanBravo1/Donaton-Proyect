package main.java.com.DonatonProyect.APIUsuario.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserCreateRequest(

        @Schema(description = "Nombre usuario")
        String name,

        @Schema(description = "Correo usuario")
        String email,

        @Schema(description = "Password")
        String password,

        @Schema(description = "Telefono")
        String phone,

        @Schema(description = "Direccion")
        String address,

        @Schema(description = "Region")
        String region,

        @Schema(description = "Comuna")
        String communa
) {}