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

        String date_start,
        String date_end,
        Integer capacity,
        String owner_name,
        String owner_email,
        String client_name,
        String client_email,
        String street,
        Integer number,
        String status,
        String cancellationPolicy
) {
    public static PeticionPendienteResponseDTO desdeModelo(Peticion peticion) {
        Inmueble in = peticion.getInmueble();
        return new PeticionPendienteResponseDTO(
                peticion.getId(),
                in.getName(),
                in.getDescription(),
                in.getUbication(),
                peticion.getPrice(),
                STR."\{peticion.getFechaDelEvento()} \{peticion.getHoraInicio().toString()}",
                STR."\{peticion.getFechaDelEvento()} \{peticion.getHoraFin().toString()}",
                in.getCapacity(),
                in.getOwner().getName(),
                in.getOwner().getEmail(),
                peticion.getCliente().getName(),
                peticion.getCliente().getEmail(),
                in.getCalle(),
                in.getAltura(),
                peticion.getEstado().getClass().getSimpleName(),
                peticion.getPoliticaCancelacion().getClass().getSimpleName()
        );
    }
}
