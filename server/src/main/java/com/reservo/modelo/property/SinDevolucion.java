package com.reservo.modelo.property;

import com.reservo.modelo.reserva.Peticion;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
public class SinDevolucion extends PoliticaDeCancelacion {

    @Override
    public double calcularReintegro(double monto){
        return 0;
    }

    @Override
    public double calcularDeuda(double monto){
        return monto;
    }

}
