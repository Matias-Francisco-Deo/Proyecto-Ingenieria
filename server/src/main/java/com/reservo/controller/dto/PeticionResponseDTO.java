package com.reservo.controller.dto;

import com.reservo.modelo.Peticion;
import com.reservo.modelo.property.PoliticasDeCancelacion;

import java.time.LocalDate;
import java.time.LocalTime;

public record PeticionResponseDTO(
        Long id,
        String client_name,
        LocalTime requested_date_start,
        LocalTime requested_date_end,
        String property_name,
        LocalDate created_date
)  {
    public static PeticionResponseDTO desdeModelo(Peticion prop) {
        return new PeticionResponseDTO(
                prop.getId(),
                prop.getCliente().getName(),
                prop.getHoraInicio(),
                prop.getHoraFin(),
                prop.getInmueble().getName(),
                prop.getFecha()
        );
    }

}
