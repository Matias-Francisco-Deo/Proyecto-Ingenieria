package com.reservo.modelo.property.enums;

import lombok.Getter;

@Getter
public enum DiasDeLaSemana {
    LUNES("Lunes"),
    MARTES("Martes"),
    MIERCOLES("Miércoles"),
    JUEVES("Jueves"),
    VIERNES("Viernes"),
    SABADO("Sábado"),
    DOMINGO("Domingo");

    private final String nombre;

    DiasDeLaSemana(String nombre) {
        this.nombre = nombre;
    }

}
