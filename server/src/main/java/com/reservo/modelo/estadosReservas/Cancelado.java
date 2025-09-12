package com.reservo.modelo.estadosReservas;

import com.reservo.modelo.Peticion;

public class Cancelado implements EstadoDePeticion {
    @Override
    public void aprobar(Peticion peticion) {}

    @Override
    public void cancelar(Peticion peticion) {}

    @Override
    public void finalizar(Peticion peticion) {}

    @Override
    public void rechazar(Peticion peticion) {}
}
