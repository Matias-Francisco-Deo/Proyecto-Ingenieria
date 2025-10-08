package com.reservo.modelo.property;

import jakarta.persistence.Entity;

@Entity
public class Flexible extends PoliticaDeCancelacion {

    @Override
    public double calcularReintegro(double monto){
        return 0;
    }

    @Override
    public double calcularDeuda(double monto){
        return 0;
    }

}
