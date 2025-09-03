package com.reservo.controller.dto;

import com.reservo.modelo.user.Usuario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioRequestDTO(
        @NotNull(message = "El nombre debe no estar en blanco")
        @NotBlank(message = "El nombre debe no estar en blanco")
        String name,
        @NotNull(message = "La contraseña debe no estar en blanco")
        @NotBlank(message = "La contraseña debe no estar en blanco")
        String password) {

    public Usuario aModelo() {
        return new Usuario(name, password);
    }
}
