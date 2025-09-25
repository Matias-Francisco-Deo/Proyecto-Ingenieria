package com.reservo.controller.dto.Inmueble;

import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.DiasDeLaSemana;
import com.reservo.modelo.property.PoliticasDeCancelacion;
import com.reservo.modelo.user.Usuario;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public record InmuebleRequestDTO(
        String name,
        String description,
        String ubication,
        Double price,
        Integer capacity,
        String condition,
        String start,
        String end,      // este
        List<DiasDeLaSemana> days,
        String cancellation, // este
        String key,           // este está NULL
        Long userId,
        String street,
        Integer number
) {
    public Inmueble aModelo(Usuario user) throws ParametroIncorrecto {
        if (name == null || description == null || price == null ||
            start == null || end == null || ubication == null ||
            capacity == null || condition == null || cancellation == null || days == null || street == null || number == null)
            throw new ParametroIncorrecto("Faltan datos para guardar");

        if (name.isBlank()) throw new ParametroIncorrecto("El nombre no debe estar en blanco.");
        if (description.isBlank()) throw new ParametroIncorrecto("La descripción no debe estar en blanco.");
        if (ubication.isBlank()) throw new ParametroIncorrecto("La ubicación no debe estar en blanco.");
        if (street.isBlank()) throw new ParametroIncorrecto("La calle no debe estar en blanco.");
        if (days.isEmpty()) throw new ParametroIncorrecto("Se deben especificar días para ocupar.");
        if (price <= 0) throw new ParametroIncorrecto("El precio debe ser mayor a 0.");
        if (capacity <= 0) throw new ParametroIncorrecto("La capacidad debe ser mayor a 0.");
        if (number <= 0) throw new ParametroIncorrecto("La altura debe ser mayor a 0.");

        getRango result = getRango();
        PoliticasDeCancelacion cancellationPolicy = getPoliticasDeCancelacion();
        List<DiasDeLaSemana> orderedDays = getDiasDeLaSemanas();

        return new Inmueble(name, description, price, ubication, capacity, condition,
                result.horaInicio(), result.horaFin(), orderedDays, cancellationPolicy,new ArrayList<>(),user,street,number);
    }

    private List<DiasDeLaSemana> getDiasDeLaSemanas() {
        List<DiasDeLaSemana> orderedDays = days.stream().sorted().toList();
        return orderedDays;
    }

    private getRango getRango() {
        LocalTime horaInicio = LocalTime.parse(start);
        LocalTime horaFin = LocalTime.parse(end);
        getRango result = new getRango(horaInicio, horaFin);
        return result;
    }

    private record getRango(LocalTime horaInicio, LocalTime horaFin) {
    }

    private PoliticasDeCancelacion getPoliticasDeCancelacion() {
        PoliticasDeCancelacion cancellationPolicy = switch (cancellation) {
            case "Flexible" -> PoliticasDeCancelacion.FLEXIBLE;
            case "Severo" -> PoliticasDeCancelacion.SEVERO;
            default -> PoliticasDeCancelacion.SIN_RETRIBUCION;
        };
        return cancellationPolicy;
    }
}
