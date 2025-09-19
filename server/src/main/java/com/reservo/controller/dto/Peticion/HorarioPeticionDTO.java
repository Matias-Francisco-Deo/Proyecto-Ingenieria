package com.reservo.controller.dto.Peticion;

import com.reservo.modelo.reserva.Peticion;

import java.time.LocalTime;

public record HorarioPeticionDTO(
        LocalTime horaInicio,
        LocalTime horaFin
) {

    public static HorarioPeticionDTO desdeModelo(Peticion prop){
        return new HorarioPeticionDTO(
                prop.getHoraInicio(),
                prop.getHoraFin()
        );

    }
}
