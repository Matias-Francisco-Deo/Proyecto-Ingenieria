package com.reservo.controller.dto.Inmueble;

import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.politicasDeCancelacion.Flexible;
import com.reservo.modelo.property.*;
import com.reservo.modelo.property.enums.DiasDeLaSemana;
import com.reservo.modelo.politicasDeCancelacion.PoliticaDeCancelacion;
import com.reservo.modelo.politicasDeCancelacion.Severo;
import com.reservo.modelo.politicasDeCancelacion.SinDevolucion;

import java.time.LocalTime;
import java.util.List;

public record InmuebleModifyRequestDTO(

        String name,
        String description,
        String ubication,
        Double price,
        Integer capacity,
        String condition,
        String start,
        String end,
        List<DiasDeLaSemana> availableDays,
        String cancellation,
        String street,
        Integer number

) {



    public Inmueble aModeloModificado(Inmueble inmueble) throws ParametroIncorrecto {

        if (name != null && name.isEmpty()) throw new ParametroIncorrecto("El nombre no debe estar en blanco.");
        if (description != null && description.isBlank()) throw new ParametroIncorrecto("La descripción no debe estar en blanco.");
        if (ubication != null && ubication.isBlank()) throw new ParametroIncorrecto("La ubicación no debe estar en blanco.");
        if (street != null && street.isBlank()) throw new ParametroIncorrecto("La calle no debe estar en blanco.");
        if (availableDays != null && availableDays.isEmpty()) throw new ParametroIncorrecto("Se deben especificar días para ocupar.");
        if (price != null && price <= 0) throw new ParametroIncorrecto("El precio debe ser mayor a 0.");
        if (capacity != null && capacity <= 0) throw new ParametroIncorrecto("La capacidad debe ser mayor a 0.");
        if (number != null && number <= 0) throw new ParametroIncorrecto("La altura debe ser mayor a 0.");


        if (this.name != null) inmueble.setName(this.name());
        if (this.description != null) inmueble.setDescription(this.description());
        if (this.ubication != null) inmueble.setUbication(this.ubication());
        if (this.price != null) inmueble.setPrice(this.price());
        if (this.capacity != null) inmueble.setCapacity(this.capacity());
        if (this.condition != null) inmueble.setConditions(this.condition());
        if (this.availableDays != null) inmueble.setAvailableDays(this.availableDays());
        if (this.cancellation != null) inmueble.setCancellation(getPoliticasDeCancelacion(cancellation));
        if (this.street != null) inmueble.setCalle(this.street());
        if (this.number != null) inmueble.setAltura(this.number());
        if (this.start != null) inmueble.setHoraInicio(LocalTime.parse(start));
        if (this.end != null) inmueble.setHoraFin(LocalTime.parse(end));

        return inmueble;
    }

    private PoliticaDeCancelacion getPoliticasDeCancelacion(String cancelacion) {
        return switch (cancelacion) {
            case "Flexible" -> new Flexible();
            case "Severo" -> new Severo();
            default -> new SinDevolucion();
        };
    }

}
