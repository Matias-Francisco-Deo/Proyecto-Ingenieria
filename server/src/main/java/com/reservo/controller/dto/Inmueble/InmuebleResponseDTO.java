package com.reservo.controller.dto.Inmueble;

import com.reservo.modelo.property.enums.DiasDeLaSemana;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.politicasDeCancelacion.PoliticaDeCancelacion;

import java.util.List;

public record InmuebleResponseDTO(
        Integer id,
        String name,
        String description,
        String ubication,
        Double price,
        Integer capacity,
        String condition,
        String start,
        String end,
        String cancellation,
        Long ownerId,
        String ownerName,
        String ownerEmail,
        List<DiasDeLaSemana> availableDays,
        String street,
        Integer number,
        String imageURL
) {
    public static InmuebleResponseDTO desdeModelo(Inmueble prop) {

        String imageUrl = prop.getFirstImageURL();

        String cancellationName = politicaAString(prop.getCancellation());

        return new InmuebleResponseDTO(
            Math.toIntExact(prop.getId()),
            prop.getName(), prop.getDescription(), prop.getUbication(),
            prop.getPrice(), prop.getCapacity(), prop.getConditions(),
            prop.getHoraInicio().toString(), prop.getHoraFin().toString(),
                cancellationName,
            prop.getOwner().getId(),
            prop.getOwner().getName(),
            prop.getOwner().getEmail(),
            prop.getAvailableDays(),
            prop.getCalle(),
            prop.getAltura(),
            imageUrl
        );
    }

    private static String politicaAString(PoliticaDeCancelacion politica) {

        String name = politica.getClass().getSimpleName();

        if (name.equals("SinDevolucion")) return "Sin devolución";

        return name;
    }
}