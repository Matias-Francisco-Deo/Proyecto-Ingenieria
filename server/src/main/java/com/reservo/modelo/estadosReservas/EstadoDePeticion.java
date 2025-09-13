package com.reservo.modelo.estadosReservas;

import com.reservo.modelo.Peticion;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public interface EstadoDePeticion {

    void aprobar(Peticion peticion);

    void cancelar(Peticion peticion);

    void rechazar(Peticion peticion);

    void finalizar(Peticion peticion);
}
