package com.reservo.controller.dto.Reservas;

import java.time.LocalDate;
import java.time.LocalTime;

public record ReservaCanceladasRechazadas(
        Long id,
        String nameInmueble,
        LocalDate dateEvento,
        LocalTime horaInicio,
        LocalTime horaFin,
        LocalDate dateEmision,
        String email,
        String nameOwner,
        Double price
) {
}
