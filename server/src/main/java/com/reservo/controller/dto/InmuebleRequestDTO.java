package com.reservo.controller.dto;

import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.PoliticasDeCancelacion;

import java.time.LocalTime;

public record InmuebleRequestDTO(
        String name,
        String description,
        String ubication,
        Double price,
        Integer capacity,
        String condition,
        String start,
        String end,
        String image,        // este
        String cancellation, // este
        String key           // este está NULL
) {
    public Inmueble aModelo() throws ParametroIncorrecto {
        if (name == null || description == null || price == null ||
            start == null || end == null || ubication == null ||
            capacity == null || condition == null || cancellation == null) // || key == null
            throw new ParametroIncorrecto("Faltan datos para guardar");

        if (name.isBlank()) throw new ParametroIncorrecto("El nombre no debe estar en blanco.");
        if (description.isBlank()) throw new ParametroIncorrecto("La descripción no debe estar en blanco.");
        if (ubication.isBlank()) throw new ParametroIncorrecto("La ubicación no debe estar en blanco.");

        LocalTime horaInicio = LocalTime.parse(start);
        LocalTime horaFin = LocalTime.parse(end);

        PoliticasDeCancelacion cancellationPolicy = switch (cancellation) {
            case "Flexible" -> PoliticasDeCancelacion.FLEXIBLE;
            case "Severo" -> PoliticasDeCancelacion.SEVERO;
            default -> PoliticasDeCancelacion.SIN_RETRIBUCION;
        };

        return new Inmueble(name, description, price, ubication, capacity, condition,
                horaInicio, horaFin, cancellationPolicy); // , new Usuario()
    }
}
