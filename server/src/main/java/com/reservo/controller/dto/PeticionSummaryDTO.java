package com.reservo.controller.dto;


import com.reservo.modelo.reserva.Peticion;

import java.time.LocalDate;
import java.time.LocalTime;

public record PeticionSummaryDTO(
        Long id,
        String client_name,
        LocalTime requested_date_start,
        LocalTime requested_date_end,
        String property_name,
        LocalDate created_date,
        LocalDate event_date
) {
    public static PeticionSummaryDTO desdeModelo(Peticion peticion) {
        return new PeticionSummaryDTO(
                peticion.getId(),
                peticion.getCliente().getName(),
                peticion.getHoraInicio(),
                peticion.getHoraFin(),
                peticion.getInmueble().getName(),
                peticion.getFechaEmision(),
                peticion.getFechaDelEvento()
        );
    }
}
