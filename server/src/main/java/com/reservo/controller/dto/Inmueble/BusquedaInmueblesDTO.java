package com.reservo.controller.dto.Inmueble;

import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.Filtro;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public record BusquedaInmueblesDTO(
        String localidad,
        String nombre,
        List<Integer> rangoPrecios,
        Integer capacidad,
        int page
) {
    public Filtro aModelo() throws ParametroIncorrecto {
        boolean tieneRangoDePrecios = this.rangoPrecios != null && !this.rangoPrecios.isEmpty();

        verificarRango(tieneRangoDePrecios);
        verificarCapacidad();

        return new Filtro(
                this.localidad,
                this.nombre,
                tieneRangoDePrecios ? this.rangoPrecios.getFirst() : null, // min
                tieneRangoDePrecios ? this.rangoPrecios.getLast() : null, // max
                this.capacidad,
                PageRequest.of(page, 10)
        );
    }

    private void verificarCapacidad() throws ParametroIncorrecto {
        if (this.capacidad != null && this.capacidad < 1) throw new ParametroIncorrecto("La capacidad debe ser mayor o igual a 1.");
    }

    private void verificarRango(boolean tieneRangoDePrecios) throws ParametroIncorrecto {
        if (tieneRangoDePrecios && this.rangoPrecios.getFirst() > this.rangoPrecios.getLast()) throw new ParametroIncorrecto("El valor mínimo debe ser menor al máximo.");
    }
}
