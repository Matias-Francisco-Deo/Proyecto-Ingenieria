package com.reservo.controller.dto;

import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.user.Usuario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioRequestDTO(
        @NotNull(message = "El nombre debe no estar en blanco") // TODO no anda
        @NotBlank(message = "El nombre debe no estar en blanco")
        String name,
        @NotNull(message = "La contraseña debe no estar en blanco")
        @NotBlank(message = "La contraseña debe no estar en blanco")
        String password,
//        @NotNull(message = "La contraseña debe no estar en blanco")
//        @NotBlank(message = "La contraseña debe no estar en blanco")
        String email
) {

    public Usuario aModelo() throws ParametroIncorrecto {
        if (name == null || password == null || email == null) throw new ParametroIncorrecto("Faltan datos para registrar.");
        if (name.isBlank() ) throw new ParametroIncorrecto("El nombre no debe estar en blanco.");
        if (password.isBlank()) throw new ParametroIncorrecto("La contraseña no debe estar en blanco.");
        if (email.isBlank() ) throw new ParametroIncorrecto("El email no debe estar en blanco.");
        return new Usuario(name, password, email);
    }
}
