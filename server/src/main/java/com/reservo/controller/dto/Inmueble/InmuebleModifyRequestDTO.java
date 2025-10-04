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
        if (name == null || description == null || price == null ||
                start == null || end == null || ubication == null ||
                capacity == null || conditions == null || cancellation == null
                || days == null || street == null || number == null)
            throw new ParametroIncorrecto("Faltan datos para guardar");

        if (name.isBlank()) throw new ParametroIncorrecto("El nombre no debe estar en blanco.");
        if (description.isBlank()) throw new ParametroIncorrecto("La descripción no debe estar en blanco.");
        if (ubication.isBlank()) throw new ParametroIncorrecto("La ubicación no debe estar en blanco.");
        if (street.isBlank()) throw new ParametroIncorrecto("La calle no debe estar en blanco.");
        if (days.isEmpty()) throw new ParametroIncorrecto("Se deben especificar días para ocupar.");
        if (price <= 0) throw new ParametroIncorrecto("El precio debe ser mayor a 0.");
        if (capacity <= 0) throw new ParametroIncorrecto("La capacidad debe ser mayor a 0.");
        if (number <= 0) throw new ParametroIncorrecto("La altura debe ser mayor a 0.");


        inmueble.setName(this.name());
        inmueble.setDescription(this.description());
        inmueble.setUbication(this.ubication());
        inmueble.setPrice(this.price());
        inmueble.setCapacity(this.capacity());
        inmueble.setConditions(this.conditions());
        inmueble.setAvailableDays(this.days());
        inmueble.setCancellation(PoliticasDeCancelacion.getPoliticasDeCancelacion(this.cancellation));
        inmueble.setCalle(this.street());
        inmueble.setAltura(this.number());
        inmueble.setHoraInicio(LocalTime.parse(start));
        inmueble.setHoraFin(LocalTime.parse(end));

        return inmueble;
    }


}
