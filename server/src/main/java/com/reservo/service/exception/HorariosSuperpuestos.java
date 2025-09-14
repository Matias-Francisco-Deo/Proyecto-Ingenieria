package com.reservo.service.exception;

public class HorariosSuperpuestos extends RuntimeException{
    public HorariosSuperpuestos() {
        super("Se solapan los horarios");
    }
}
