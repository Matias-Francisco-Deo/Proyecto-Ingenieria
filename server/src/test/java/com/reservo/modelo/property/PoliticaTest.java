package com.reservo.modelo.property;

import com.reservo.modelo.politicasDeCancelacion.Flexible;
import com.reservo.modelo.politicasDeCancelacion.PoliticaDeCancelacion;
import com.reservo.modelo.politicasDeCancelacion.Severo;
import com.reservo.modelo.politicasDeCancelacion.SinDevolucion;
import com.reservo.modelo.reserva.Peticion;
import com.reservo.modelo.user.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PoliticaTest {

    private PoliticaDeCancelacion flex;
    private PoliticaDeCancelacion sinDevolucion;
    private PoliticaDeCancelacion severo;
    private Usuario jorge;
    private Inmueble propiedad;
    private Peticion peticion;

    @BeforeEach
    public void setUp() {
        flex = new Flexible();
        severo = new Severo();
        sinDevolucion = new SinDevolucion();

        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");

        propiedad = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, sinDevolucion,"lavalle",987);

        peticion = new Peticion(jorge,propiedad, LocalDate.now().plusDays(1),LocalTime.of(12, 30), LocalTime.of(14, 30),100D);
    }

    @Test
    void calcularDeudaConPoliticaSinDevolucionDentroDeLos7DiasPreviosAlEvento(){
        double deuda = sinDevolucion.aplicarPolitica(peticion);
        assertEquals(100d,deuda);
    }
    @Test
    void calcularDeudaConPoliticaFlexibleDentroDeLos7DiasPreviosAlEvento(){
        double deuda = flex.aplicarPolitica(peticion);
        assertEquals(30d,deuda);
    }
    @Test
    void calcularDeudaConPoliticaSeveroDentroDeLos7DiasPreviosAlEvento(){
        double deuda = severo.aplicarPolitica(peticion);
        assertEquals(100d,deuda);
    }

    @Test
    void calcularDeudaConPoliticaSinDevolucionFueraDeLos7DiasPreviosAlEvento(){
        peticion.setFechaDelEvento(LocalDate.now().plusDays(10));
        double deuda = sinDevolucion.aplicarPolitica(peticion);
        assertEquals(100,deuda);
    }
    @Test
    void calcularDeudaConPoliticaFlexibleFueraDeLos7DiasPreviosAlEvento(){
        peticion.setFechaDelEvento(LocalDate.now().plusDays(10));
        double deuda = flex.aplicarPolitica(peticion);
        assertEquals(0,deuda);
    }
    @Test
    void calcularDeudaConPoliticaSeveroEntreDeLos7Y30DiasPreviosAlEvento(){
        peticion.setFechaDelEvento(LocalDate.now().plusDays(10));
        double deuda = severo.aplicarPolitica(peticion);
        assertEquals(50d,deuda);
    }
    @Test
    void calcularDeudaConPoliticaSeveroFueraDeLos30DiasPreviosAlEvento(){
        peticion.setFechaDelEvento(LocalDate.now().plusDays(40));
        double deuda = severo.aplicarPolitica(peticion);
        assertEquals(0,deuda);
    }
    //testeamos reintegros
    @Test
    void calcularReintegroConPoliticaSinDevolucionDentroDeLos7DiasPreviosAlEvento(){
        peticion.setPagado(true);
        double reintegro = sinDevolucion.aplicarPolitica(peticion);
        assertEquals(0,reintegro);
    }
    @Test
    void calcularReintegroConPoliticaFlexibleDentroDeLos7DiasPreviosAlEvento(){
        peticion.setPagado(true);
        double reintegro = flex.aplicarPolitica(peticion);
        assertEquals(70d,reintegro);
    }
    @Test
    void calcularReintegroConPoliticaSeveroDentroDeLos7DiasPreviosAlEvento(){
        peticion.setPagado(true);
        double reintegro = severo.aplicarPolitica(peticion);
        assertEquals(0,reintegro);
    }

    @Test
    void calcularReintegroConPoliticaSinDevolucionFueraDeLos7DiasPreviosAlEvento(){
        peticion.setPagado(true);
        peticion.setFechaDelEvento(LocalDate.now().plusDays(10));
        double reintegro = sinDevolucion.aplicarPolitica(peticion);
        assertEquals(0,reintegro);
    }
    @Test
    void calcularReintegroConPoliticaFlexibleFueraDeLos7DiasPreviosAlEvento(){
        peticion.setPagado(true);
        peticion.setFechaDelEvento(LocalDate.now().plusDays(10));
        double reintegro = flex.aplicarPolitica(peticion);
        assertEquals(100,reintegro);
    }
    @Test
    void calcularReintegroConPoliticaSeveroEntreDeLos7Y30DiasPreviosAlEvento(){
        peticion.setPagado(true);
        peticion.setFechaDelEvento(LocalDate.now().plusDays(10));
        double reintegro = severo.aplicarPolitica(peticion);
        assertEquals(50d,reintegro);
    }
    @Test
    void calcularReintegroConPoliticaSeveroFueraDeLos30DiasPreviosAlEvento(){
        peticion.setPagado(true);
        peticion.setFechaDelEvento(LocalDate.now().plusDays(40));
        double reintegro = severo.aplicarPolitica(peticion);
        assertEquals(100,reintegro);
    }

}
