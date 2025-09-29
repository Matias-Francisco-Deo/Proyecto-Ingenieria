package com.reservo.controller.dto.Inmueble;

import com.reservo.modelo.property.Inmueble;

public record InmuebleSummaryDTO (
        Integer id,
        String name,
        String ubication,
        Double price,
        String nameDelDuenio,
        String email,
        String imageURL
){
    public static InmuebleSummaryDTO desdeModelo(Inmueble prop) {

        String imageUrl = prop.getFirstImageURL();

        return new InmuebleSummaryDTO(
                Math.toIntExact(prop.getId()),
                prop.getName(),
                prop.getUbication(),
                prop.getPrice(),
                prop.getOwner().getName(),
                prop.getOwner().getEmail(),
                imageUrl
        );
    }
}