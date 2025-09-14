package com.reservo.service.exception;

public class EsDueñoDeLaPropiedadSolicitada extends RuntimeException{
    public EsDueñoDeLaPropiedadSolicitada() {
        super("No puede solicitar su propia vivienda");
    }
}
