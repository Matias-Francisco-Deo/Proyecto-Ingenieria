package com.reservo.controller.dto.Inmueble;

import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.property.DiasDeLaSemana;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.PoliticasDeCancelacion;
import com.reservo.modelo.user.Usuario;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public record InmuebleModifyRequestDTO(

        String name,
        String description,
        String ubication,
        Double price,
        Integer capacity,
        String conditions,
        String start,
        String end,      // este
        List<DiasDeLaSemana> days,
        String cancellation, // este
        String street,
        Integer number

) {



    public Inmueble aModeloModificado(Inmueble inmueble) throws ParametroIncorrecto {

        if (name != null && name.isEmpty()) throw new ParametroIncorrecto("El nombre no debe estar en blanco.");
        if (description != null && description.isBlank()) throw new ParametroIncorrecto("La descripción no debe estar en blanco.");
        if (ubication != null && ubication.isBlank()) throw new ParametroIncorrecto("La ubicación no debe estar en blanco.");
        if (street != null && street.isBlank()) throw new ParametroIncorrecto("La calle no debe estar en blanco.");
        if (days != null && days.isEmpty()) throw new ParametroIncorrecto("Se deben especificar días para ocupar.");
        if (price != null && price <= 0) throw new ParametroIncorrecto("El precio debe ser mayor a 0.");
        if (capacity != null && capacity <= 0) throw new ParametroIncorrecto("La capacidad debe ser mayor a 0.");
        if (number != null && number <= 0) throw new ParametroIncorrecto("La altura debe ser mayor a 0.");


        if (this.name != null) inmueble.setName(this.name());
        if (this.description != null) inmueble.setDescription(this.description());
        if (this.ubication != null) inmueble.setUbication(this.ubication());
        if (this.price != null) inmueble.setPrice(this.price());
        if (this.capacity != null) inmueble.setCapacity(this.capacity());
        if (this.conditions != null) inmueble.setConditions(this.conditions());
        if (this.days != null) inmueble.setAvailableDays(this.days());
        if (this.cancellation != null) inmueble.setCancellation(PoliticasDeCancelacion.getPoliticasDeCancelacion(this.cancellation));
        if (this.street != null) inmueble.setCalle(this.street());
        if (this.number != null) inmueble.setAltura(this.number());
        if (this.start != null) inmueble.setHoraInicio(LocalTime.parse(start));
        if (this.end != null) inmueble.setHoraFin(LocalTime.parse(end));

        return inmueble;
    }


}
