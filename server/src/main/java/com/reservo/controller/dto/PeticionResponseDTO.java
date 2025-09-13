package com.reservo.controller.dto;

import com.reservo.modelo.Peticion;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.PoliticasDeCancelacion;
import com.reservo.modelo.user.Usuario;

import java.time.LocalDate;
import java.time.LocalTime;

public record PeticionResponseDTO(
        Long peticionId,
        Long userId,
        Long inmuebleId,
        Double price,
        LocalDate Fecha,
        LocalTime horaInicio,
        LocalTime horaFin,
        PoliticasDeCancelacion politicaCancelacion
)  {
    public static PeticionResponseDTO desdeModelo(Peticion prop) {
        return new PeticionResponseDTO(
                prop.getId(),
                prop.getCliente().getId(),
                prop.getInmueble().getId(),
                prop.getPrice(),
                prop.getFecha(),
                prop.getHoraInicio(),
                prop.getHoraFin(),
                prop.getPoliticaCancelacion()
        );
    }

}
