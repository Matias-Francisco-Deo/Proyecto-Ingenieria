package com.reservo.persitencia.dao;

import com.reservo.modelo.reserva.Peticion;
import com.reservo.modelo.reserva.estadosReservas.Cancelado;
import com.reservo.modelo.reserva.estadosReservas.Vigente;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.PoliticasDeCancelacion;
import com.reservo.modelo.user.Usuario;
import com.reservo.persistencia.DAO.InmuebleDAO;
import com.reservo.persistencia.DAO.PeticionDAO;
import com.reservo.persistencia.DAO.user.UsuarioDAO;
import com.reservo.testUtils.TestService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PeticionDAOTests {

    @Autowired
    private TestService testService;

    @Autowired
    private UsuarioDAO usuarioDAO;

    @Autowired
    private PeticionDAO peticionDAO;

    private Usuario jorge;
    private Usuario alan;
    private Usuario raul;
    private PoliticasDeCancelacion cancellation;
    private Inmueble inmueble;
    private List<MultipartFile> emptyImages;
    private Peticion peticionDeJorge;
    private Peticion peticionDeAlan;
    @Autowired
    private InmuebleDAO inmuebleDAO;


    @BeforeEach
    public void setUp() {


        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        alan = new Usuario("alan", "aa21", "alan@yahoo.com.ar");
        raul = new Usuario("alan", "aa21", "raul@yahoo.com.ar");

        inmueble = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.now().plusMinutes(30), LocalTime.now().plusHours(1), raul, PoliticasDeCancelacion.SIN_RETRIBUCION);

        emptyImages = Collections.emptyList();

        peticionDeJorge = new Peticion(jorge, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);
        peticionDeAlan = new Peticion(alan, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(45), LocalTime.now().plusMinutes(55), 100D);
        peticionDeAlan.setEstado(new Vigente());

    }

    @Test
    void laPeticionEsDeUnDueñoEspecifico() {
        usuarioDAO.save(jorge);
        usuarioDAO.save(raul);

        inmuebleDAO.save(inmueble);

        peticionDAO.save(peticionDeJorge);

        assertTrue(peticionDAO.isPetitionOfOwner(peticionDeJorge.getId(), raul.getId()));
    }

    @Test
    void laPeticionNoEsDeUnDueñoEspecifico() {
        usuarioDAO.save(jorge);
        usuarioDAO.save(raul);

        inmuebleDAO.save(inmueble);

        peticionDAO.save(peticionDeJorge);

        assertFalse(peticionDAO.isPetitionOfOwner(peticionDeJorge.getId(), jorge.getId()));
    }

    @Test
    void unaPeticionEsRechazada() {
        usuarioDAO.save(jorge);
        usuarioDAO.save(raul);

        inmuebleDAO.save(inmueble);

        peticionDAO.save(peticionDeJorge);

        Peticion peticionFromDb =  peticionDAO.findById(peticionDeJorge.getId()).get();
        peticionFromDb.rechazar("No me gustó la comida de perro");
        peticionDAO.save(peticionFromDb);

        Peticion rejectedPeticionFromDb =  peticionDAO.findById(peticionDeJorge.getId()).get();

        assertInstanceOf(Cancelado.class, rejectedPeticionFromDb.getEstado());
    }


    @AfterEach
    void limpiarDb(){
        testService.eliminarPeticiones();
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();
    }
}
