package com.DonatonProyect.APIUsuario.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class UserDTO {

    @Schema(description = "Nombre del usuario")
    private String name;

    @Schema(description = "Correo del usuario (debe ser único)")
    private String email;

    @Schema(description = "Contraseña del usuario")
    private String password;

    @Schema(description = "Telefono")
    private String phone;

    @Schema(description = "Dirección")
    private String address;

    @Schema(description = "Región")
    private String region;

    @Schema(description = "Comuna")
    private String comuna;

}
