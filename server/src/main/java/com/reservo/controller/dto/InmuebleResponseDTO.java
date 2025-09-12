package com.reservo.controller.dto;

import com.reservo.modelo.property.Inmueble;

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
        String ownerName
        //Long ownerId,
        //String ownerContact
) {
    public static InmuebleResponseDTO desdeModelo(Inmueble prop) {
        return new InmuebleResponseDTO(
            Math.toIntExact(prop.getId()),
            prop.getName(), prop.getDescription(), prop.getUbication(),
            prop.getPrice(), prop.getCapacity(), prop.getConditions(),
            prop.getHoraInicio().toString(), prop.getHoraFin().toString(),
            prop.getCancellation().toString(),
            prop.getOwner().getName()
            //prop.getOwner().getId(),
            //prop.getUser().getTelefono()
        );
    }
}