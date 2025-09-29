package com.reservo.modelo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Pageable;

@Getter
@Setter
@AllArgsConstructor
public class Filtro {
    private String localidad;
    private String nombre;
    private Pageable page;
}
