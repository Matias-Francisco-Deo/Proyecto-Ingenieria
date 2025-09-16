package com.reservo.service.exception;

public class HorarioDesordenado extends RuntimeException{
    public HorarioDesordenado() {
        super("Los horarios deben estar ordenados");
    }
}
