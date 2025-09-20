package com.reservo.service.exception.peticion;

public class PeticionVencida extends RuntimeException {
    public PeticionVencida(String msg) {
        super(msg);
    }
}
