package com.reservo.controller.dto;

import com.reservo.modelo.Peticion;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.PoliticasDeCancelacion;
import com.reservo.modelo.user.Usuario;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;

public record PeticionRequestDTO (
    Long userId,
    Long inmuebleId,
    Double price,
    LocalDate Fecha,
    LocalTime horaInicio,
    LocalTime horaFin,
    PoliticasDeCancelacion politicaCancelacion
){
    public Peticion aModelo(Inmueble inmueble, Usuario user){//TODO agregar validaciones
        return new Peticion(user,inmueble,price,Fecha,horaInicio,horaFin,politicaCancelacion);
    }
}
