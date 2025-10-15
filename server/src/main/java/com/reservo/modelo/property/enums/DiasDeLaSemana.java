package com.reservo.modelo.property.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;

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

    public static List<DiasDeLaSemana> getTodos() {
        return Arrays.asList(DiasDeLaSemana.values());
    }

    DiasDeLaSemana(String nombre) {
        this.nombre = nombre;
    }
    
    

}
