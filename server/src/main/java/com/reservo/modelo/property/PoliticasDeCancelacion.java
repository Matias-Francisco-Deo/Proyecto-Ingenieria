package com.reservo.modelo.property;

public enum PoliticasDeCancelacion {
    SIN_RETRIBUCION,
    FLEXIBLE,
    SEVERO;

    public static PoliticasDeCancelacion getPoliticasDeCancelacion(String cancellation) {
        return switch (cancellation) {
            case "FLEXIBLE" -> PoliticasDeCancelacion.FLEXIBLE;
            case "SEVERO" -> PoliticasDeCancelacion.SEVERO;
            default -> PoliticasDeCancelacion.SIN_RETRIBUCION;
        };
    }
}


