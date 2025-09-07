package com.reservo.controller.dto;

import com.reservo.modelo.property.Inmueble;

public record InmuebleResponseDTO(String nombre) {
    public static InmuebleResponseDTO desdeModelo(Inmueble prop) {
        return new InmuebleResponseDTO(prop.getName());
    }
}
