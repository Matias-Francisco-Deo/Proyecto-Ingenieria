package com.reservo.modelo.reserva.estadosReservas;

import com.reservo.modelo.reserva.Peticion;
import jakarta.persistence.Entity;

@Entity
public class Pendiente extends EstadoDePeticion {
    @Override
    public void aprobar(Peticion peticion) {
        peticion.setEstado(new Vigente());
    }

    @Override
    public double cancelar(Peticion peticion) {
        peticion.setEstado(new Cancelado());
        return 0;
    }

    @Override
    public void rechazar(Peticion peticion) {
        peticion.setEstado(new Cancelado());
    }

    @Override
    public void finalizar(Peticion peticion) {

    }
}
