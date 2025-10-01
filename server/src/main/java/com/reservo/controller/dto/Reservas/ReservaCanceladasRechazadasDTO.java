package com.reservo.controller.dto.Reservas;

import com.reservo.controller.dto.Inmueble.InmuebleReservaDTO;
import com.reservo.modelo.reserva.Peticion;

import java.time.LocalDate;
import java.time.LocalTime;

public record ReservaCanceladasRechazadasDTO(
        Long id,
        LocalDate dateEvento,
        LocalTime horaInicio,
        LocalTime horaFin,
        LocalDate dateEmision,
        String motivoCancelacion,
        Double priceToPay,
        InmuebleReservaDTO inmuebleDTO
)
{
    public static ReservaCanceladasRechazadasDTO desdeModelo(Peticion peticion){
        return new ReservaCanceladasRechazadasDTO(
                peticion.getId(),
                peticion.getFechaDelEvento(),
                peticion.getHoraInicio(),
                peticion.getHoraFin(),
                peticion.getFechaEmision(),
                peticion.getMotivoCancelacionRechazo(),
                peticion.getPrice(),
                InmuebleReservaDTO.desdeModelo(peticion.getInmueble())
        );
    }
}
