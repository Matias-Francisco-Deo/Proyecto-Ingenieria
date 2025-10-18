package com.reservo.modelo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Filtro {
    private String localidad;
    private String nombre;
    private Integer precioMin;
    private Integer precioMax;
    private Pageable page;
}
