package com.reservo.modelo.property;

public enum PoliticasDeCancelacion {
    SIN_RETRIBUCION,
    FLEXIBLE,
    SEVERO;

    public static PoliticasDeCancelacion getPoliticasDeCancelacion(String cancellation) {
        return switch (cancellation) {
            case "Flexible" -> PoliticasDeCancelacion.FLEXIBLE;
            case "Severo" -> PoliticasDeCancelacion.SEVERO;
            default -> PoliticasDeCancelacion.SIN_RETRIBUCION;
        };
    }
}


