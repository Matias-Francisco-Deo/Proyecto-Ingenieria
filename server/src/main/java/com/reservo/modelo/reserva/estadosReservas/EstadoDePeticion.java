package com.reservo.modelo.reserva.estadosReservas;

import com.reservo.modelo.reserva.Peticion;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class EstadoDePeticion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public void aprobar(Peticion peticion) {}

    public double cancelar(Peticion peticion) {
        return 0;
    }


    public void finalizar(Peticion peticion) {}


    public void rechazar(Peticion peticion) {}
}
