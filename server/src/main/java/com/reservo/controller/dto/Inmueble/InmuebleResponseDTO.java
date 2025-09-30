package com.reservo.controller.dto.Inmueble;

import com.reservo.modelo.property.DiasDeLaSemana;
import com.reservo.modelo.property.Inmueble;

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
        String ownerName,
        String ownerEmail,
        List<DiasDeLaSemana> availableDays,
        String street,
        Integer number,
        String imageURL
) {
    public static InmuebleResponseDTO desdeModelo(Inmueble prop) {

        String imageUrl = prop.getFirstImageURL();

        return new InmuebleResponseDTO(
            Math.toIntExact(prop.getId()),
            prop.getName(), prop.getDescription(), prop.getUbication(),
            prop.getPrice(), prop.getCapacity(), prop.getConditions(),
            prop.getHoraInicio().toString(), prop.getHoraFin().toString(),
            prop.getCancellation().toString(),
            prop.getOwner().getName(),
            prop.getOwner().getEmail(),
            prop.getAvailableDays(),
            prop.getCalle(),
            prop.getAltura(),
            imageUrl
        );
    }
}