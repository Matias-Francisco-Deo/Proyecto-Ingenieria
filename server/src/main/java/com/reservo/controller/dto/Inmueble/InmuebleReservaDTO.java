package com.reservo.controller.dto.Inmueble;

import com.reservo.controller.dto.Usuario.OwnerResponseDTO;
import com.reservo.modelo.property.Inmueble;

public record InmuebleReservaDTO(
        String nameInmueble,
        String ubication,
        String calle,
        Integer altura,
        OwnerResponseDTO owner
) {
    public static InmuebleReservaDTO desdeModelo(Inmueble inmueble) {
        return new InmuebleReservaDTO(
                inmueble.getName(),
                inmueble.getUbication(),
                inmueble.getCalle(),
                inmueble.getAltura(),
                OwnerResponseDTO.desdeModelo(inmueble.getOwner())
        );
    }
}
