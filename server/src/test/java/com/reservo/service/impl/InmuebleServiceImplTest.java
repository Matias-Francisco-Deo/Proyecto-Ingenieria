package com.reservo.service.impl;

import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.InmuebleService;
import com.reservo.service.UsuarioService;
import com.reservo.service.exception.EmailRepetido;
import com.reservo.service.exception.InmuebleRepetidoException;
import com.reservo.testUtils.TestService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class InmuebleServiceImplTest {

    @Autowired
    private TestService testService; // cambiar por uno para inmueble

    @Autowired
    private InmuebleService inmuebleService;

    @Autowired
    private UsuarioService userService;

    private Usuario jorge;
    private Usuario juan;
    private Inmueble inmueble1;
    private Inmueble inmueble2;

    @BeforeEach
    public void setUp() {

        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        juan = new Usuario("juan", "aa22", "juan@yahoo.com.ar");

        inmueble1 = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge);

        inmueble2 = new Inmueble(
                "Quincho", "Es un lugar espacioso", 200d,"Quilmes", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), juan);
    }

    @Test
    public void alRecuperarUnIdInexistenteNoTraeNada() {
        Optional<Inmueble> in = inmuebleService.findById(Long.valueOf(-3L));

        assertFalse(in.isPresent());
    }

    @Test
    void seGuardaUnInmuebleEnlaDB() throws EmailRepetido {
        userService.create(jorge);
        inmuebleService.create(inmueble1);
        Optional<Inmueble> in = inmuebleService.findById(inmueble1.getId());

        assertTrue(in.isPresent());
    }

    @Test
    void sePersistenLosDatosDelInmueble() throws EmailRepetido {
        userService.create(jorge);
        inmuebleService.create(inmueble1);
        Optional<Inmueble> in = inmuebleService.findById(inmueble1.getId());

        assertEquals("Plaza", in.get().getName());
        assertEquals("Es una plaza linda", in.get().getDescription());
        assertEquals(200d, in.get().getPrice());
        assertEquals("Berazategui", in.get().getUbication());
        assertEquals(100, in.get().getCapacity());
        assertEquals("No romper nada", in.get().getConditions());
        assertEquals(jorge.getId(), in.get().getOwner().getId());
    }

    @Test
    void sePersistenVariasPropiedades() throws EmailRepetido {
        userService.create(jorge);
        userService.create(juan);
        inmuebleService.create(inmueble1);
        inmuebleService.create(inmueble2);

        List<Inmueble> inmuebles = inmuebleService.findAll();

        assertEquals(2, inmuebles.size());
    }

    @Test
    void noPuedenHaberDosUsuariosConElInmueble() throws EmailRepetido {
        userService.create(jorge);
        userService.create(juan);
        inmuebleService.create(inmueble1);

        assertThrows(InmuebleRepetidoException.class, () -> {inmuebleService.create(inmueble1);});
    }

    @AfterEach
    void limpiarDb(){
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();
    }

}
