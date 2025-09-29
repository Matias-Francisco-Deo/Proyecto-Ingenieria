package com.reservo.controller.dto.Usuario;

import com.reservo.modelo.user.Usuario;

public record OwnerResponseDTO(
        String email,
        String nameOwner
) {
    public static OwnerResponseDTO desdeModelo(Usuario owner) {
        return new OwnerResponseDTO(
                owner.getEmail(),
                owner.getName()
        );
    }
}
