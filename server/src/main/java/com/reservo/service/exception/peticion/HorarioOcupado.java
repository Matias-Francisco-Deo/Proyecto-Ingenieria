package com.reservo.service.exception.peticion;

public class HorarioOcupado extends RuntimeException {
    public HorarioOcupado(String s) {
        super(s);
    }
}
