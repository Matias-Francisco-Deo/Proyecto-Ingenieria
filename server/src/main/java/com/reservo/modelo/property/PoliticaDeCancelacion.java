package com.reservo.modelo.property;

import com.reservo.modelo.reserva.Peticion;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class PoliticaDeCancelacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public double aplicarPolitica(Peticion peticion){

        long diasAnticipacion = ChronoUnit.DAYS.between(LocalDate.now(), peticion.getFechaDelEvento());

        if(peticion.getPagado()){
            return  this.calcularReintegro(peticion.getPrice(),diasAnticipacion);
        }else{
            return  this.calcularDeuda(peticion.getPrice(),diasAnticipacion);}

    }

    public abstract double calcularReintegro(double monto,Long diasAnticipacion);
    public abstract double calcularDeuda(double monto,Long diasAnticipacion);
}
