package com.reservo.controller.dto.Peticion;

import com.reservo.modelo.reserva.Peticion;

public record RechazoDTO(Long ownerId, Long peticionId, String motivoDeRechazo) {
    public Peticion aModelo() {
        return new Peticion();
    }
}
