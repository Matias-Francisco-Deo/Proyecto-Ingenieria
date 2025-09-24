package com.reservo.controller.dto.Reservas;

import com.reservo.modelo.reserva.Peticion;

import java.time.LocalDate;
import java.time.LocalTime;

public record ReservaPendienteDTO(
        Long id,
        String nameInmueble,
        LocalDate dateEvento,
        LocalTime horaInicio,
        LocalTime horaFin,
        LocalDate dateEmision,
        String email,
        String nameOwner
){
    public static ReservaPendienteDTO desdeModelo(Peticion prop) {
        return new ReservaPendienteDTO(
                prop.getId(),
                prop.getInmueble().getName(),
                prop.getFechaDelEvento(),
                prop.getHoraInicio(),
                prop.getHoraFin(),
                prop.getFechaEmision(),
                prop.getInmueble().getOwner().getEmail(),
                prop.getInmueble().getOwner().getName()
        );
    }
}
