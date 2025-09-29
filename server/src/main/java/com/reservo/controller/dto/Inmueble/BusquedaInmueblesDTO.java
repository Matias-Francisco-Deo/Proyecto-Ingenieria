package com.reservo.controller.dto.Inmueble;

import com.reservo.modelo.Filtro;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;

public record BusquedaInmueblesDTO(
        String localidad,
        String nombre,
        int page
) {
    public Filtro aModelo() {
        return new Filtro(
                this.localidad,
                this.nombre,
                PageRequest.of(page, 10)
        );
    }
}
