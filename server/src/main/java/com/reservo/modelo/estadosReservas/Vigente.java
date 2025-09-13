package com.reservo.modelo.estadosReservas;

import com.reservo.modelo.Peticion;
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
