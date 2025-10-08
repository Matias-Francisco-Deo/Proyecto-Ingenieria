package com.reservo.modelo.property;

import jakarta.persistence.Entity;

@Entity
public class Flexible extends PoliticaDeCancelacion {

    @Override
    public double calcularReintegro(double monto, Long diasAnticipacion){
        if(diasAnticipacion > 7) {
            return monto;
        }else {
            return monto * 0.7;
        }
    }

    @Override
    public double calcularDeuda(double monto, Long diasAnticipacion){
        if(diasAnticipacion > 7){
            return 0;
        } else {
            return monto * 0.3;
        }
    }

}
