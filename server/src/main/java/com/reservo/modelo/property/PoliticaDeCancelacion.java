package com.reservo.modelo.property;

import com.reservo.modelo.reserva.Peticion;
import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class PoliticaDeCancelacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public void aplicarPolitica(Peticion peticion){

        double monto;

        if(peticion.getPagado()){
            monto = this.calcularReintegro(peticion.getPrice());
        }else{
            monto = this.calcularDeuda(peticion.getPrice());}


    }

    public abstract double calcularReintegro(double monto);
    public abstract double calcularDeuda(double monto);
}
