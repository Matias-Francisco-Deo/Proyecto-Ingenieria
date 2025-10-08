package com.reservo.modelo.property;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
public class Severo extends PoliticaDeCancelacion {

    @Override
    public double calcularReintegro(double monto){
        return 0;
    }

    @Override
    public double calcularDeuda(double monto){
        return 0;
    }

}
