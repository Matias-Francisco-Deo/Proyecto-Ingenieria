package com.reservo.service.exception.peticion;

public class HorarioDesordenado extends RuntimeException{
    public HorarioDesordenado() {
        super("Los horarios deben estar ordenados");
    }
}
