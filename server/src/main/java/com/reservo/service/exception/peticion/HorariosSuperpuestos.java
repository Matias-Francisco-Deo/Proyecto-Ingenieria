package com.reservo.service.exception.peticion;

public class HorariosSuperpuestos extends RuntimeException{
    public HorariosSuperpuestos() {
        super("Se solapan los horarios");
    }
}
