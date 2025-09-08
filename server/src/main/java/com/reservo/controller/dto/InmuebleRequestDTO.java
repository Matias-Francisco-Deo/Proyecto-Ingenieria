package com.reservo.controller.dto;

import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.RangoHorario;
import com.reservo.modelo.user.Usuario;
import org.yaml.snakeyaml.util.Tuple;

import java.time.LocalTime;

public record InmuebleRequestDTO(
        String name,
        String description,
        String ubication,
        Double price,
        Integer capacity,
        String condition,
        String start,                // este
        String end,                  // este
        String image,                   // este
        String policy,                  // este
        String key                      // este está NULL
) {
    public Inmueble aModelo() throws ParametroIncorrecto {
        if (name == null || description == null || price == null ||
                start == null || end == null || ubication == null || capacity == null) // || key == null
            throw new ParametroIncorrecto("Faltan datos para guardar");

        if (name.isBlank()) throw new ParametroIncorrecto("El nombre no debe estar en blanco.");
        if (description.isBlank()) throw new ParametroIncorrecto("La descripción no debe estar en blanco.");
        if (ubication.isBlank()) throw new ParametroIncorrecto("La ubicación no debe estar en blanco.");
//        if (price.isBlank()) throw new ParametroIncorrecto("El precio no debe estar en blanco.");
//        if (start.isBlank()) throw new ParametroIncorrecto("La hora de inicio no debe estar en blanco.");
//        if (end.isBlank()) throw new ParametroIncorrecto("La hora de fin no debe estar en blanco.");
//        if (capacity.isBlank()) throw new ParametroIncorrecto("La capacidad no debe estar en blanco.");
//        if (owner.isBlank()) throw new ParametroIncorrecto("El dueño------ no debe estar en blanco.");

//        RangoHorario rango = new RangoHorario(start, end);

        LocalTime horaInicio = LocalTime.parse(start);
        LocalTime horaFin = LocalTime.parse(end);

        return new Inmueble(name, description, price, ubication, capacity, condition,
                horaInicio, horaFin); // , new Usuario()
        // revisar una forma de traer al owner, véase el usuario que creó el request
    }
}

