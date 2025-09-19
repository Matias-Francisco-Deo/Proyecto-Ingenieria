package com.reservo.controller.dto.Peticion;

import lombok.Getter;
import lombok.Setter;

public record RechazoDTO(Long ownerId, Long peticionId, String motivoDeRechazo) {

}
