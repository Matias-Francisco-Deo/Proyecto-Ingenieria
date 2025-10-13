package com.reservo.modelo.politicasDeCancelacion;

import jakarta.persistence.Entity;

@Entity
public class SinDevolucion extends PoliticaDeCancelacion {

    @Override
    public double calcularReintegro(double monto, Long diasAnticipacion){
        return 0;
    }

    @Override
    public double calcularDeuda(double monto,Long diasAnticipacion){
        return monto;
    }

    @Override
    public String getTipo() {
        return "Sin Devolución";
    }

}
