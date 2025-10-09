package com.reservo.modelo.reserva;

import com.reservo.modelo.property.SinDevolucion;
import com.reservo.modelo.reserva.estadosReservas.Cancelado;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.PoliticasDeCancelacion;
import com.reservo.modelo.reserva.estadosReservas.Vigente;
import com.reservo.modelo.user.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;

public class ReservaTest {
    private Usuario jorge;
    private Inmueble propiedad;
    private Peticion peticionDeJorge;

    @BeforeEach
    public void setUp() {
        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");

        propiedad = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(),"lavalle",987);

        peticionDeJorge = new Peticion(jorge, propiedad, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);
    }

    @Test
    public void peticionSePasaARechazado() {
        peticionDeJorge.rechazar("No me gustó la comida de gato");
        assertInstanceOf(Cancelado.class, peticionDeJorge.getEstado());
    }

    @Test
    public void peticionSePasaAVigente() {
        peticionDeJorge.aprobar();
        assertInstanceOf(Vigente.class, peticionDeJorge.getEstado());
    }

    @Test
    public void peticionTieneMotivoDeRechazo() {
        peticionDeJorge.rechazar("No me gustó la comida de gato");
        assertInstanceOf(Cancelado.class, peticionDeJorge.getEstado());
    }



}
