package com.reservo.modelo.reserva.estadosReservas;

import com.reservo.modelo.reserva.Peticion;
import jakarta.persistence.Entity;

@Entity
public class Pendiente extends EstadoDePeticion {
    @Override
    public void aprobar(Peticion peticion) {

    }

    @Override
    public void cancelar(Peticion peticion) {

    }

    @Override
    public void rechazar(Peticion peticion) {
        peticion.setEstado(new Cancelado());
    }

    @Override
    public void finalizar(Peticion peticion) {

    }
}
