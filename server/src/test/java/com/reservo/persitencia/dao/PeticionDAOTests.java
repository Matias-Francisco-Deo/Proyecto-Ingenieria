package com.reservo.persitencia.dao;

import com.reservo.modelo.property.DiasDeLaSemana;
import com.reservo.modelo.property.SinDevolucion;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    private Peticion peticionDeprecada;
    private Peticion peticionDeprecadaDeVariosDias;
    private List<DiasDeLaSemana> emptyDays;

    @Autowired
    private InmuebleDAO inmuebleDAO;


    @BeforeEach
    public void setUp() {
        emptyDays = Collections.emptyList();

        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        alan = new Usuario("alan", "aa21", "alan@yahoo.com.ar");
        raul = new Usuario("raul", "aa21", "raul@yahoo.com.ar");

        inmueble = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.now().plusMinutes(30), LocalTime.now().plusHours(1), raul, new SinDevolucion(),"lavalle",987);

        emptyImages = Collections.emptyList();
        inmueble.setAvailableDays(Collections.emptyList());

        peticionDeJorge = new Peticion(jorge, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);
        peticionDeAlan = new Peticion(alan, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(45), LocalTime.now().plusMinutes(55), 100D);
        peticionDeprecada = new Peticion(alan, inmueble, LocalDate.now(),LocalTime.now().minusMinutes(45), LocalTime.now().minusMinutes(55), 100D);
        peticionDeprecadaDeVariosDias = new Peticion(alan, inmueble, LocalDate.now().minusDays(10),LocalTime.now().minusMinutes(45), LocalTime.now().minusMinutes(55), 100D);
        peticionDeAlan.setEstado(new Vigente());
        usuarioDAO.save(raul);
        inmuebleDAO.save(inmueble);
    }

    @Test
    void laPeticionEsDeUnDueñoEspecifico() {
        /*usuarioDAO.save(jorge);

        peticionDAO.save(peticionDeJorge);

        assertTrue(peticionDAO.isPetitionOfOwner(peticionDeJorge.getId(), raul.getId()));*/
    }
/*
    @Test
    void unaPeticionSeDeprecaHoy() {
        usuarioDAO.save(alan);




        peticionDAO.save(peticionDeprecada);

        assertTrue(peticionDAO.itsDeprecatedFromDateAndTime(peticionDeprecada.getId(), LocalDate.now(), LocalTime.now()));
    }

    @Test
    void unaPeticionDeVariosDiasAtrasSeDeprecaHoy() {
        usuarioDAO.save(alan);



        peticionDAO.save(peticionDeprecadaDeVariosDias);

        assertTrue(peticionDAO.itsDeprecatedFromDateAndTime(peticionDeprecadaDeVariosDias.getId(), LocalDate.now(), LocalTime.now()));
    }

    @Test
    void unaPeticionNoEstáDeprecada() {
        usuarioDAO.save(alan);



        peticionDAO.save(peticionDeAlan);

        assertFalse(peticionDAO.itsDeprecatedFromDateAndTime(peticionDeAlan.getId(), LocalDate.now(), LocalTime.now()));
    }

    @Test
    void unaPeticionYaFueAceptadaParaEseRangoHorarioEmpiezaAntesQueTermineLaOtraYTerminaDespues() {
        usuarioDAO.save(alan);
        usuarioDAO.save(jorge);



        peticionDeJorge.setEstado(new Vigente());
        peticionDAO.save(peticionDeJorge);

        assertTrue(peticionDAO.wasAcceptedInSameTimeRange(peticionDeAlan.getInmueble().getId(), peticionDeAlan.getFechaDelEvento(), peticionDeAlan.getHoraInicio(), peticionDeAlan.getHoraFin()));
    }

    @Test
    void unaPeticionYaFueAceptadaParaEseRangoHorarioEmpiezanEnMismoHorario() {
        Peticion peticionDeAlan2 = new Peticion(alan, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(60), 100D);
        usuarioDAO.save(alan);
        usuarioDAO.save(jorge);



        peticionDeJorge.setEstado(new Vigente());
        peticionDAO.save(peticionDeJorge);

        assertTrue(peticionDAO.wasAcceptedInSameTimeRange(peticionDeAlan2.getInmueble().getId(), peticionDeAlan2.getFechaDelEvento(), peticionDeAlan2.getHoraInicio(), peticionDeAlan2.getHoraFin()));
    }

    @Test
    void unaPeticionNoCuentaComoAceptadaParaEseRangoHorarioPorqueTerminaEnMismoHorarioEnQueEmpiezaElOtro() {
        // dates fijas porque sino revienta todo el mambo
        LocalDate fecha = LocalDate.of(2025, 9, 22);
        LocalTime horaInicioJorge = LocalTime.of(10, 0);
        LocalTime horaFinJorge = LocalTime.of(10, 30);

        LocalTime horaInicioAlan = LocalTime.of(10, 30);
        LocalTime horaFinAlan = LocalTime.of(10, 40);

        Peticion peticionDeJorge2 = new Peticion(alan, inmueble, fecha, horaInicioJorge, horaFinJorge, 100D);
        Peticion peticionDeAlan2 = new Peticion(alan, inmueble, fecha, horaInicioAlan, horaFinAlan, 100D);
        usuarioDAO.save(alan);
        usuarioDAO.save(jorge);
        


        this.peticionDeJorge.setEstado(new Vigente());
        peticionDAO.save(peticionDeAlan2);

        assertFalse(peticionDAO.wasAcceptedInSameTimeRange(peticionDeJorge2.getInmueble().getId(), peticionDeJorge2.getFechaDelEvento(), peticionDeJorge2.getHoraInicio(), peticionDeJorge2.getHoraFin()));
    }

    @Test
    void unaPeticionNoFueAceptadaParaEseRangoHorario() {
        usuarioDAO.save(alan);


        peticionDAO.save(peticionDeprecada);

        assertFalse(peticionDAO.wasAcceptedInSameTimeRange(peticionDeprecada.getInmueble().getId(), peticionDeprecada.getFechaDelEvento(), peticionDeprecada.getHoraInicio(), peticionDeprecada.getHoraFin()));
    }

    @Test
    void laPeticionNoEsDeUnDueñoEspecifico() {
        usuarioDAO.save(jorge);




        peticionDAO.save(peticionDeJorge);

        assertFalse(peticionDAO.isPetitionOfOwner(peticionDeJorge.getId(), jorge.getId()));
    }

    @Test
    void unaPeticionEsRechazada() {
        usuarioDAO.save(jorge);




        peticionDAO.save(peticionDeJorge);

        Peticion peticionFromDb =  peticionDAO.findById(peticionDeJorge.getId()).get();
        peticionFromDb.rechazar("No me gustó la comida de perro");
        peticionDAO.save(peticionFromDb);

        Peticion rejectedPeticionFromDb =  peticionDAO.findById(peticionDeJorge.getId()).get();

        assertInstanceOf(Cancelado.class, rejectedPeticionFromDb.getEstado());
    }

    @Test
    void unaPeticionEsAprobada() {
        usuarioDAO.save(jorge);




        peticionDAO.save(peticionDeJorge);

        Peticion peticionFromDb =  peticionDAO.findById(peticionDeJorge.getId()).get();
        peticionFromDb.aprobar();
        peticionDAO.save(peticionFromDb);

        Peticion approvedPeticionFromDb =  peticionDAO.findById(peticionDeJorge.getId()).get();

        assertInstanceOf(Vigente.class, approvedPeticionFromDb.getEstado());
    }

    @Test
    void unaPeticionYaAprobadaNoSeBuscaComoPendiente() {
        usuarioDAO.save(jorge);




        peticionDAO.save(peticionDeJorge);

        Peticion peticionFromDb =  peticionDAO.findById(peticionDeJorge.getId()).get();
        peticionFromDb.aprobar();
        peticionDAO.save(peticionFromDb);

        assertTrue(peticionDAO.findPendienteById(peticionDeJorge.getId()).isEmpty());
    }

    @Test
    void seBuscaUnaPeticionYaAprobada() {
        usuarioDAO.save(jorge);



        peticionDeJorge.setEstado(new Vigente());

        peticionDAO.save(peticionDeJorge);

        assertTrue(peticionDAO.findVigenteById(peticionDeJorge.getId()).isPresent());
    }

    @Test
    void seBuscaUnaPeticionYaRechazada() {
        usuarioDAO.save(jorge);



        peticionDeJorge.setEstado(new Cancelado());

        peticionDAO.save(peticionDeJorge);

        assertTrue(peticionDAO.findRejectedById(peticionDeJorge.getId()).isPresent());
    }

    @Test
    void seBuscaUnaPeticionYaAprobadaPeroEstabaPendiente() {
        usuarioDAO.save(jorge);




        peticionDAO.save(peticionDeJorge);

        assertFalse(peticionDAO.findVigenteById(peticionDeJorge.getId()).isPresent());
    }

    @Test
    void seBuscaUnaPeticionYaRechazadaPeroEstabaPendiente() {
        usuarioDAO.save(jorge);




        peticionDAO.save(peticionDeJorge);

        assertFalse(peticionDAO.findRejectedById(peticionDeJorge.getId()).isPresent());
    }

    @Test
    void unaPeticionRechazadaNoSeBuscaComoPendiente() {
        usuarioDAO.save(jorge);




        peticionDAO.save(peticionDeJorge);

        Peticion peticionFromDb =  peticionDAO.findById(peticionDeJorge.getId()).get();
        peticionFromDb.rechazar("NO ME GUSTAN LAS MAYUS!!!!!");
        peticionDAO.save(peticionFromDb);

        assertTrue(peticionDAO.findPendienteById(peticionDeJorge.getId()).isEmpty());
    }

    @Test
    void unaPeticionPendienteSeBusca() {
        usuarioDAO.save(jorge);




        peticionDAO.save(peticionDeJorge);

        assertFalse(peticionDAO.findPendienteById(peticionDeJorge.getId()).isEmpty());
    }


*/

    @AfterEach
    void limpiarDb(){
        testService.eliminarPeticiones();
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();
    }
}
