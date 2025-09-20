package com.reservo.service.exception.peticion;

public class RangoDeHorarioSuperado extends RuntimeException {
    public RangoDeHorarioSuperado() {
        super("Se supero el rango del horario");
    }
}
