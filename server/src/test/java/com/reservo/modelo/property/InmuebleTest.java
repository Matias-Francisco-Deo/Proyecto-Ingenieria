package com.reservo.modelo.property;

import com.reservo.modelo.user.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.yaml.snakeyaml.util.Tuple;

import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class InmuebleTest {
    private Usuario jorge;
    private Inmueble propiedad;

    @BeforeEach
    public void setUp() {
        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");

        propiedad = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, PoliticasDeCancelacion.SIN_RETRIBUCION);
    }

    @Test
    public void inmuebleTieneNombre() {
        assertEquals("Plaza", propiedad.getName());
    }

    @Test
    public void inmuebleTieneDescripcion() {
        assertEquals("Es una plaza linda",propiedad.getDescription());
    }

//    @Test
//    public void inmuebleTieneImagen() {
//        assertEquals("/root/imagen.png",propiedad.getImage());
//    }

    @Test
    public void inmuebleTienePrecio() {
        assertEquals(200d, propiedad.getPrice());
    }

//    @Test
//    public void inmuebleTieneUnHorarioDeInicio() {
//        assertEquals(LocalTime.of(12, 0), propiedad.getTimeRanges().getFirst()._1());
//    }
//
//    @Test
//    public void inmuebleTieneUnHorarioDeCierre() {
//        assertEquals(LocalTime.of(20, 0), propiedad.getTimeRanges().getFirst()._2());
//    }

    @Test
    public void inmuebleTieneUbicacion() {
        assertEquals("Berazategui", propiedad.getUbication());
    }

    @Test
    public void inmuebleTieneCapacidad() {
        assertEquals(100, propiedad.getCapacity());
    }

    @Test
    public void inmuebleTieneCondition() {
        assertEquals("No romper nada", propiedad.getConditions());
    }

//    @Test
//    public void inmuebleTienePoliticasDeCancelacion() {
//        assertEquals("No cancelar un jueves", propiedad.getCancellationPolicy());
//    }

    @Test
    public void inmuebleTieneNombreUsuario() {
        assertEquals(jorge.getId() , propiedad.getOwner().getId());
    }
}
