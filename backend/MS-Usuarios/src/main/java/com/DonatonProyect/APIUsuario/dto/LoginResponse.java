package com.DonatonProyect.APIUsuario.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    @Schema(description = "Indica si el login fue exitoso")
    private boolean success;

    @Schema(description = "Mensaje relacionado al resultado del login")
    private String mensaje;

}
