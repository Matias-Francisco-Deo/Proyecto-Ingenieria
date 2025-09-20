package com.reservo.controller.dto.Peticion;

import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.reserva.Peticion;

import java.time.LocalTime;

public record PeticionPendienteResponseDTO(
        Long id,
        String name,
        String description,
        String ubication,
        Double price,
        // falta el dia acá
        String date_start,
        String date_end,
        Integer capacity,
        String client_name,
        String client_email
) {
    public static PeticionPendienteResponseDTO desdeModelo(Peticion peticion) {
        Inmueble in = peticion.getInmueble();
        return new PeticionPendienteResponseDTO(
                peticion.getId(),
                in.getName(),
                in.getDescription(),
                in.getUbication(),
                peticion.getPrice(),
                STR."\{peticion.getFecha()} \{peticion.getHoraInicio().toString()}",
                STR."\{peticion.getFecha()} \{peticion.getHoraFin().toString()}",
                in.getCapacity(),
                peticion.getCliente().getName(),
                peticion.getCliente().getEmail()
        );
    }
}
