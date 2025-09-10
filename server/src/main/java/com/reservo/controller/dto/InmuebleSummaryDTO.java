package com.reservo.controller.dto;

import com.reservo.modelo.property.Inmueble;

public record InmuebleSummaryDTO (
        Integer id,
        String name,
        String  ubication,
        Double price,
        String nameDelDuenio,
        String email
){
    public static InmuebleSummaryDTO desdeModelo(Inmueble prop) {
        return new InmuebleSummaryDTO(
                Math.toIntExact(prop.getId()),
                prop.getName(), prop.getUbication(),
                prop.getPrice(),
                prop.getOwner().getName(),
                prop.getOwner().getEmail()
        );
    }
}
