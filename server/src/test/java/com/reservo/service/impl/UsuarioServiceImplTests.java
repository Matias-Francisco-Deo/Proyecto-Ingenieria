package com.reservo.service.impl;

import com.reservo.controller.dto.Usuario.CredentialsDTO;
import com.reservo.modelo.politicasDeCancelacion.Flexible;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.enums.DiasDeLaSemana;
import com.reservo.modelo.reserva.Peticion;
import com.reservo.modelo.user.Credentials;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.InmuebleService;
import com.reservo.service.PeticionService;
import com.reservo.service.UsuarioService;
import com.reservo.service.exception.CredencialesIncorrectas;
import com.reservo.service.exception.EmailRepetido;
import com.reservo.service.exception.user.UsuarioNoPuedeSerEliminado;
import com.reservo.testUtils.TestService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
@SpringBootTest
public class UsuarioServiceImplTests {

    @Autowired
    private TestService testService;

    @Autowired
    private InmuebleService inmuebleService;

    @Autowired
    private PeticionService peticionService;

    @Autowired
    private UsuarioService usuarioService;

    Usuario jorge;
    Usuario juanito;
    Inmueble inmueble1;
    Inmueble inmueble2;
    Peticion peticionDeJorge;
    Peticion peticionDeJuanito;


    @BeforeEach
    void crearInstancias() {
        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        juanito = new Usuario("juanito", "bb22", "juanito@yahoo.com.ar");

        inmueble1 = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.of(12, 0), LocalTime.of(20, 0), DiasDeLaSemana.getTodos(), new Flexible(), List.of("plaza2.jpg"), juanito,"lavalle",987);
        inmueble2 = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.of(12, 0), LocalTime.of(20, 0), DiasDeLaSemana.getTodos(), new Flexible(), List.of("plaza2.jpg"), jorge,"lavalle",987);

        peticionDeJorge = new Peticion(jorge, inmueble1, LocalDate.now().plusDays(1), LocalTime.of(12, 0), LocalTime.of(20, 0), 100D);
        peticionDeJuanito = new Peticion(juanito, inmueble2, LocalDate.now().plusDays(1), LocalTime.of(12, 0), LocalTime.of(20, 0), 100D);
    }

    @Test
    void alRecuperarUnIdInexistenteNoTraeNada(){
        Optional<Usuario> user = usuarioService.findById(-5L);

        assertFalse(user.isPresent());
    }

    @Test
    void seGuardaUnUserEnlaDB() throws EmailRepetido {
        usuarioService.create(jorge);
        Optional<Usuario> user = usuarioService.findById(jorge.getId());

        assertTrue(user.isPresent());
    }

    @Test
    void sePersistenLosDatosDeUnUser() throws EmailRepetido {
        usuarioService.create(jorge);
        Optional<Usuario> userDeDb = usuarioService.findById(jorge.getId());

        assertEquals("jorge", userDeDb.get().getName());
        assertEquals("aa21", userDeDb.get().getPassword());
    }

    @Test
    void sePersistenVariosUsers() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(juanito);

        List<Usuario> usersDeDb = usuarioService.findAll();

        assertEquals(2, usersDeDb.size());
    }

    @Test
    void noPuedenHaberDosUsuariosConElMismoEmail() throws EmailRepetido {
        usuarioService.create(jorge);

        assertThrows(EmailRepetido.class, () -> {usuarioService.create(new Usuario("enriqueElFurioso", "hate", "jorge@yahoo.com.ar"));});
    }

    @Test
    void seObtieneUnaKeyParaAccederAlSistemaAlLoguear() throws EmailRepetido, CredencialesIncorrectas {
        usuarioService.create(jorge);
        CredentialsDTO credenciales = usuarioService.login(new Credentials("jorge@yahoo.com.ar", "aa21"));
        assertEquals("jorge", credenciales.username());
        assertFalse(credenciales.key().isEmpty());
    }

    @Test
    void alLoguearConDatosIncorrectosTiraException() throws EmailRepetido {
        usuarioService.create(jorge);
        assertThrows(CredencialesIncorrectas.class, () -> {usuarioService.login(new Credentials("jorge@yahoo.com.ar", "contrasenia"));});
    }

    @Test
    void soLogueaUnUsuarioDeNuevoYTieneUnaKeyDistinta() throws EmailRepetido, CredencialesIncorrectas {
        usuarioService.create(jorge);

        /* Un login */
        CredentialsDTO credenciales1 = usuarioService.login(new Credentials("jorge@yahoo.com.ar", "aa21"));

        /* Otro login */
        CredentialsDTO credenciales2 = usuarioService.login(new Credentials("jorge@yahoo.com.ar", "aa21"));

        assertEquals("jorge", credenciales2.username());
        assertFalse(credenciales2.key().isEmpty());
        assertNotEquals(credenciales1.key(), credenciales2.key());
    }


    @Test
    void noSePuedeEliminarUserConReservasVigentes() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(juanito);
        inmuebleService.create(inmueble1, new ArrayList<>());

        peticionService.create(peticionDeJorge);
        peticionService.approve(peticionDeJorge.getId());

        assertThrows(UsuarioNoPuedeSerEliminado.class, () -> usuarioService.delete(jorge.getId()));
    }

    @Test
    void noSePuedeEliminarUserConPeticionesVigentes() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(juanito);
        inmuebleService.create(inmueble2, new ArrayList<>());

        peticionService.create(peticionDeJuanito);
        peticionService.approve(peticionDeJuanito.getId());

        assertThrows(UsuarioNoPuedeSerEliminado.class, () -> usuarioService.delete(jorge.getId()));
    }

    @Test
    void seEliminaUsuarioSinReservasNiPeticionesDeLaApp() throws EmailRepetido {
        usuarioService.create(jorge);

        usuarioService.delete(jorge.getId());

        assertTrue(usuarioService.findAll().isEmpty());
    }

    @Test
    void seEliminaUsuarioConReservas() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(juanito);
        inmuebleService.create(inmueble1, new ArrayList<>());

        peticionService.create(peticionDeJorge);

        usuarioService.delete(jorge.getId());

        assertEquals(1, usuarioService.findAll().size());
    }

    @Test
    void seEliminaUsuarioConPeticionesPendientes() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(juanito);
        inmuebleService.create(inmueble1, new ArrayList<>());

        peticionService.create(peticionDeJorge);

        usuarioService.delete(jorge.getId());

        assertEquals(1, usuarioService.findAll().size());
    }

    @Test
    void seEliminaUsuarioConReservasPendientes() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(juanito);
        inmuebleService.create(inmueble2, new ArrayList<>());

        peticionService.create(peticionDeJuanito);

        usuarioService.delete(jorge.getId());
    }



    @AfterEach
    void limpiarDb(){
        testService.eliminarPeticiones();
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();;
    }
}
