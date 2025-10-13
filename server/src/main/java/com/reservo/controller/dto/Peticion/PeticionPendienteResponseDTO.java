package com.reservo.controller.dto.Peticion;

import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.politicasDeCancelacion.PoliticaDeCancelacion;
import com.reservo.modelo.reserva.Peticion;


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
        String cancellationName = politicaAString(in.getCancellation());

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
                cancellationName
        );
    }

    private static String politicaAString(PoliticaDeCancelacion politica) {

        String name = politica.getClass().getSimpleName();

        if (name.equals("SinDevolucion")) return "Sin devolución";

        return name;
    }
}
