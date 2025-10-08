package com.reservo.modelo.property;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
public class Severo extends PoliticaDeCancelacion {

    @Override
    public double calcularReintegro(double monto, Long diasAnticipacion){
        if (diasAnticipacion > 30) {
            return monto;
        } else if (diasAnticipacion >= 7) {
            return monto * 0.5;
        } else {
            return 0;
        }
    }

    @Override
    public double calcularDeuda(double monto, Long diasAnticipacion){
        if (diasAnticipacion > 30) {
            return 0;
        } else if (diasAnticipacion >= 7) {
            return monto * 0.5;
        } else {
            return monto;
        }
    }

}
