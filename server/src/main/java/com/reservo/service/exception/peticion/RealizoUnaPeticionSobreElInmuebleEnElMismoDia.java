package com.reservo.service.exception.peticion;

public class RealizoUnaPeticionSobreElInmuebleEnElMismoDia extends RuntimeException{

    public RealizoUnaPeticionSobreElInmuebleEnElMismoDia() {
        super("Sólo se admite una reserva por día.");
    }
}
