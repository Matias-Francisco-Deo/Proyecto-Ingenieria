package com.reservo.modelo.estadosReservas;

import com.reservo.modelo.Peticion;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class EstadoDePeticion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public abstract void aprobar(Peticion peticion);

    public abstract void cancelar(Peticion peticion);

    public abstract void rechazar(Peticion peticion);

    public abstract void finalizar(Peticion peticion);
}
