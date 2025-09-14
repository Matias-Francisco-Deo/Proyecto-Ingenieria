package com.reservo.service.exception;

public class RangoDeHorarioSuperado extends RuntimeException {
    public RangoDeHorarioSuperado() {
        super("Se supero el rango del horario");
    }
}
