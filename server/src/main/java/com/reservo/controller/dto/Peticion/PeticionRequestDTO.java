package com.reservo.controller.dto.Peticion;

import com.reservo.modelo.reserva.Peticion;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.user.Usuario;

import java.time.LocalDate;
import java.time.LocalTime;

public record PeticionRequestDTO (
    Long userId,
    Long inmuebleId,
    LocalDate fecha,
    LocalTime horaInicio,
    LocalTime horaFin
    ,Double precioTotal
){
    public Peticion aModelo(Inmueble inmueble, Usuario user){//TODO agregar validaciones
        return new Peticion(user,inmueble,fecha,horaInicio,horaFin,precioTotal);
    }
}
