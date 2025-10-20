package com.reservo.persitencia.dao;

import com.reservo.modelo.politicasDeCancelacion.Flexible;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.ReservoImage;
import com.reservo.modelo.property.enums.DiasDeLaSemana;
import com.reservo.modelo.reserva.Peticion;
import com.reservo.modelo.reserva.estadosReservas.Vigente;
import com.reservo.modelo.user.Usuario;
import com.reservo.persistencia.DAO.PeticionDAO;
import com.reservo.persistencia.DAO.inmueble.InmuebleDAO;
import com.reservo.persistencia.DAO.user.UsuarioDAO;
import com.reservo.testUtils.TestService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UsuarioDAOTests {

    @Autowired
    private TestService testService;

    @Autowired
    private UsuarioDAO usuarioDAO;

    @Autowired
    private PeticionDAO peticionDAO;

    @Autowired
    private InmuebleDAO inmuebleDAO;

    Usuario jorge;
    Usuario juanito;
    private Inmueble inmueble1;
    private Inmueble inmueble2;
    private Peticion peticionDeJorge;
    private Peticion peticionDeJuanito;
    ReservoImage image1 = new ReservoImage("plaza2", "plaza2.jpg");

    @BeforeEach
    void crearInstancias() {
        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        juanito = new Usuario("juanito", "bb22", "juanito@yahoo.com.ar");
        inmueble1 = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), DiasDeLaSemana.getTodos(), new Flexible(), List.of(image1), juanito,"lavalle",987);
        inmueble2 = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), DiasDeLaSemana.getTodos(), new Flexible(), List.of(image1), jorge,"lavalle",987);

        peticionDeJorge = new Peticion(jorge, inmueble1, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);
        peticionDeJuanito = new Peticion(juanito, inmueble2, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);
    }

    @Test
    void siSeCargoUnEmailEsteExisteEnLaDBParaOtroID() {
        usuarioDAO.save(jorge);
        assertTrue(usuarioDAO.existeEmail("jorge@yahoo.com.ar", 0L));
    }

    @Test
    void usuarioConCredencialesValidasDaLosDatos() {
        usuarioDAO.save(jorge);
        Optional<Usuario> user = usuarioDAO.getUsuarioConCredenciales("jorge@yahoo.com.ar", "aa21");
        assertEquals(user.get().getName(), jorge.getName());
    }

    @Test
    void usuarioConCredencialesInvalidasDevuelveVacio() {
        usuarioDAO.save(jorge);
        Optional<Usuario> user = usuarioDAO.getUsuarioConCredenciales("jorge@yahoo.com.ar", "contrasenia");
        assertTrue(user.isEmpty());
    }

    @Test
    void usuarioNoTieneReservasVigentes() {
        usuarioDAO.save(jorge);
        assertFalse(usuarioDAO.tieneReservasVigentes(jorge.getId()));
    }

    @Test
    void usuarioTieneReservasVigentes() {
        usuarioDAO.save(jorge);
        usuarioDAO.save(juanito);
        inmuebleDAO.save(inmueble1);

        peticionDeJorge.setEstado(new Vigente());
        peticionDAO.save(peticionDeJorge);

        assertTrue(usuarioDAO.tieneReservasVigentes(jorge.getId()));
    }

    @Test
    void usuarioTieneReservasPeroNoSonVigentes() {
        usuarioDAO.save(jorge);
        usuarioDAO.save(juanito);

        inmuebleDAO.save(inmueble1);

        peticionDAO.save(peticionDeJorge);
        assertFalse(usuarioDAO.tieneReservasVigentes(jorge.getId()));
    }

    @Test
    void usuarioNoTienePeticionesVigentes() {
        usuarioDAO.save(jorge);
        assertFalse(usuarioDAO.tienePeticionesVigentes(jorge.getId()));
    }

    @Test
    void usuarioTienePeticionesVigentes() {
        usuarioDAO.save(jorge);
        usuarioDAO.save(juanito);

        inmuebleDAO.save(inmueble2);

        peticionDeJuanito.setEstado(new Vigente());
        peticionDAO.save(peticionDeJuanito);

        assertTrue(usuarioDAO.tienePeticionesVigentes(jorge.getId()));
    }

    @Test
    void usuarioTienePeticionesPeroNoSonVigentes() {
        usuarioDAO.save(jorge);
        usuarioDAO.save(juanito);

        inmuebleDAO.save(inmueble2);

        peticionDAO.save(peticionDeJuanito);

        assertFalse(usuarioDAO.tienePeticionesVigentes(jorge.getId()));
    }



    @AfterEach
    void limpiarDb(){

        testService.eliminarPeticiones();
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();;
    }
}
