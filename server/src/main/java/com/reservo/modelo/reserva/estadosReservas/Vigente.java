package com.reservo.modelo.reserva.estadosReservas;

import com.reservo.modelo.reserva.Peticion;
import jakarta.persistence.Entity;

@Entity
public class Vigente extends EstadoDePeticion {
    @Override
    public void aprobar(Peticion peticion) {

    }

    @Override
    public void cancelar(Peticion peticion) {

    }

    @Override
    public void rechazar(Peticion peticion) {

    }

    @Override
    public void finalizar(Peticion peticion) {

    }
}
