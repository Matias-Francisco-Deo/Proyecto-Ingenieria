package com.reservo.modelo.estadosReservas;

import com.reservo.modelo.Peticion;

public interface EstadoDePeticion {

    void aprobar(Peticion peticion);

    void cancelar(Peticion peticion);

    void rechazar(Peticion peticion);

    void finalizar(Peticion peticion);
}
