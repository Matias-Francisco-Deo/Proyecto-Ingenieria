package com.reservo.modelo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.Pageable;

import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
public class Filtro {
    private String localidad;
    private String nombre;
    private Integer precioMin;
    private Integer precioMax;
    private LocalTime horarioMin;
    private LocalTime horarioMax;
    private Pageable page;
}
