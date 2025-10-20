package com.reservo.controller.dto.Inmueble;

import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.Filtro;
import org.springframework.data.domain.PageRequest;

import java.time.LocalTime;
import java.util.List;

public record BusquedaInmueblesDTO(
        String localidad,
        String nombre,
        List<Integer> rangoPrecios,
        List<LocalTime> rangoHorarios,
        Integer capacidad,
        int page
) {
    public Filtro aModelo() throws ParametroIncorrecto {
        boolean tieneRangoDePrecios = this.rangoPrecios != null && !this.rangoPrecios.isEmpty();
        boolean tieneRangoHorarios = this.rangoHorarios != null && !this.rangoHorarios.isEmpty();

        verificarRango(tieneRangoDePrecios);
        verificarRangoHorario(tieneRangoHorarios);

        verificarCapacidad();

        return new Filtro(
                this.localidad,
                this.nombre,
                tieneRangoDePrecios ? this.rangoPrecios.getFirst() : null, // min
                tieneRangoDePrecios ? this.rangoPrecios.getLast() : null, // max
                tieneRangoHorarios ? this.rangoHorarios.getFirst() : null,
                tieneRangoHorarios ? this.rangoHorarios.getLast() : null,
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

    private void verificarRangoHorario(boolean tieneRangoDePrecios) throws ParametroIncorrecto {
        if (tieneRangoDePrecios && this.rangoHorarios.getFirst().isAfter(this.rangoHorarios.getLast()))
            throw new ParametroIncorrecto("El horario de inicio debe ser antes que el horario de fin");
    }
}
