package com.reservo.controller.dto.Usuario;

import com.reservo.modelo.user.Usuario;

public record UsuarioResponseDTO(String nombre, String email, String password) {
    public static UsuarioResponseDTO desdeModelo(Usuario user) {
        return new UsuarioResponseDTO(
                user.getName(),
                user.getEmail(),
                user.getPassword()
        );
    }
}