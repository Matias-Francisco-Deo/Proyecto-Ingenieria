package com.reservo.service.impl;

import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.PoliticasDeCancelacion;
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
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalTime;
import java.util.Collections;
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
    private PoliticasDeCancelacion cancellation;
    private Inmueble inmueble1;
    private Inmueble inmueble2;
    private List<MultipartFile> emptyImages;

    @BeforeEach
    public void setUp() {

        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        juan = new Usuario("juan", "aa22", "juan@yahoo.com.ar");

        inmueble1 = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, PoliticasDeCancelacion.SIN_RETRIBUCION);

        inmueble2 = new Inmueble(
                "Quincho", "Es un lugar espacioso", 200d,"Quilmes", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), juan, PoliticasDeCancelacion.SIN_RETRIBUCION);

        emptyImages = Collections.emptyList();
    }

    @Test
    public void alRecuperarUnIdInexistenteNoTraeNada() {
        Optional<Inmueble> in = inmuebleService.findById(Long.valueOf(-3L));

        assertFalse(in.isPresent());
    }

    @Test
    void seGuardaUnInmuebleEnlaDB() throws EmailRepetido {
        userService.create(jorge);


        inmuebleService.create(inmueble1,emptyImages);
        Optional<Inmueble> in = inmuebleService.findById(inmueble1.getId());

        assertTrue(in.isPresent());
    }

    @Test
    void sePersistenLosDatosDelInmueble() throws EmailRepetido {
        userService.create(jorge);
        inmuebleService.create(inmueble1,emptyImages);
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
        inmuebleService.create(inmueble1,emptyImages);
        inmuebleService.create(inmueble2,emptyImages);

        List<Inmueble> inmuebles = inmuebleService.findAll();

        assertEquals(2, inmuebles.size());
    }

    @Test
    void noPuedenHaberDosUsuariosConElInmueble() throws EmailRepetido {
        userService.create(jorge);
        userService.create(juan);
        inmuebleService.create(inmueble1,emptyImages);

        assertThrows(InmuebleRepetidoException.class, () -> {inmuebleService.create(inmueble1,emptyImages);});
    }

    @AfterEach
    void limpiarDb(){
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();
    }

}
