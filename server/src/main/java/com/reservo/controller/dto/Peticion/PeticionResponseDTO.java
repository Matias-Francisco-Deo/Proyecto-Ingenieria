package com.reservo.controller.dto.Peticion;

import com.reservo.modelo.reserva.Peticion;
import com.reservo.modelo.property.PoliticasDeCancelacion;

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
