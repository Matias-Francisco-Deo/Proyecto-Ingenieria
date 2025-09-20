package com.reservo.service.impl;

import com.reservo.modelo.reserva.Peticion;
import com.reservo.controller.dto.Peticion.RechazoDTO;
import com.reservo.modelo.reserva.estadosReservas.Cancelado;
import com.reservo.modelo.reserva.estadosReservas.Pendiente;
import com.reservo.modelo.reserva.estadosReservas.Vigente;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.PoliticasDeCancelacion;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.InmuebleService;
import com.reservo.service.PeticionService;
import com.reservo.service.UsuarioService;
import com.reservo.service.exception.*;
import com.reservo.service.exception.peticion.*;
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
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PeticionServiceImplTest {

    public static final String NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO = "No me gustó la comida de ganzo.";
    @Autowired
    private TestService testService; // cambiar por uno para inmueble


    @Autowired
    PeticionService peticionService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private InmuebleService inmuebleService;

    private Usuario jorge;
    private Usuario alan;
    private Usuario raul;
    private PoliticasDeCancelacion cancellation;
    private Inmueble inmueble;
    private List<MultipartFile> emptyImages;
    private Peticion peticionDeJorge;
    private Peticion peticionDeAlan;
    private Peticion peticionDeAlanNoVigente;


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

        peticionDeAlanNoVigente = new Peticion(alan, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(45), LocalTime.now().plusMinutes(55), 100D);

    }

    @Test
    public void solicitaLaPlazaElUsuarioJorge() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        Peticion peticionSaved = peticionService.create(peticionDeJorge);

        Optional<Peticion> peticionGot = peticionService.findById(peticionSaved.getId());

        assertTrue(peticionGot.isPresent());
    }

    @Test
    public void solicitaLaPlazaElUsuarioJorgePeroAlanYaLaSolicito() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(alan);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        peticionService.create(peticionDeAlan);

        assertThrows(HorariosSuperpuestos.class, () -> peticionService.create(peticionDeJorge));
    }

    @Test
    public void solicitaLaPlazaElUsuarioJorgePeroTieneLosHorariosDesordenados() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        LocalTime horaInicio = peticionDeJorge.getHoraInicio();


        peticionDeJorge.setHoraInicio(peticionDeJorge.getHoraFin());
        peticionDeJorge.setHoraFin(horaInicio);


        assertThrows(HorarioDesordenado.class, () -> peticionService.create(peticionDeJorge));
    }

    @Test
    public void solicitaLaPlazaElUsuarioJorgePeroLosHorariosNoEstanContenidosPorLosHorariosDelInmueble() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        peticionDeJorge.setHoraInicio(inmueble.getHoraInicio().minusMinutes(1));


        assertThrows(RangoDeHorarioSuperado.class, () -> peticionService.create(peticionDeJorge));
    }

    @Test
    public void elViajeroEnElTiempoSolicitaLaPlaza() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmueble.setHoraInicio(LocalTime.now().minusMinutes(40));
        inmueble.setHoraFin(LocalTime.now().plusHours(1));

        inmuebleService.create(inmueble, emptyImages);

        peticionDeJorge.setFecha(LocalDate.now().minusDays(1));
        peticionDeJorge.setHoraInicio(LocalTime.now().minusMinutes(30));
        peticionDeJorge.setHoraFin(LocalTime.now().plusMinutes(30));

        assertThrows(VieneDelPasado.class, () -> peticionService.create(peticionDeJorge));
    }

    @Test
    public void jorgeIntentaPedirDosVecesLaPlaza() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        peticionService.create(peticionDeJorge);

        Peticion peticionPe = new Peticion(jorge, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);

        assertThrows(RealizoUnaPeticionSobreElInmuebleEnElMismoDia.class, () -> peticionService.create(peticionPe));


    }

    @Test
    public void jorgeSolicitaLasPeticionesVigentesDeHoy() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(alan);
        usuarioService.create(raul);

        Inmueble savedIn = inmuebleService.create(inmueble, emptyImages);

        peticionDeJorge.setEstado(new Vigente());
        Peticion savedPeticion = peticionService.create(peticionDeJorge);

        Peticion peticionDelFuturo =  new Peticion(alan, inmueble, LocalDate.now().plusDays(3),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);
        peticionDelFuturo.setEstado(new Vigente());

        Peticion savedPeticion2 = peticionService.create(peticionDelFuturo);

        List<Peticion> peticiones = peticionService.findAllVigentesByDateInInmueble(savedIn.getId(), LocalDate.now());

        assertThat(peticiones)
                .extracting(Peticion::getId)
                .contains(savedPeticion.getId())
                .doesNotContain(savedPeticion2.getId())
                .hasSize(1);
    }

    @Test
    public void raulIntentaSolicitarSuInmueble() throws EmailRepetido {
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        Peticion peticionRaul = new Peticion(raul, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);

        assertThrows(EsDueñoDeLaPropiedadSolicitada.class, () -> peticionService.create(peticionRaul));
    }

    @Test
    public void unInmuebleEsReservadoPorUnUsuarioYLuegoCanceladoPorSuDueñoYSuEstadoPasaARechazado() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        Peticion peticionSaved = peticionService.create(peticionDeJorge);

        RechazoDTO rechazoDTO = new RechazoDTO(raul.getId(), peticionSaved.getId(), "No me gustó la comida de ganzo.");

        peticionService.reject(rechazoDTO);

        Peticion peticionFromDb = peticionService.findById(peticionSaved.getId()).get();

        assertInstanceOf(Cancelado.class, peticionFromDb.getEstado());

    }

    @Test
    public void unInmuebleEsReservadoPorUnUsuarioYLuegoCanceladoPorSuDueñoYTieneMensajeDeRechazo() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        Peticion peticionSaved = peticionService.create(peticionDeJorge);

        RechazoDTO rechazoDTO = new RechazoDTO(raul.getId(), peticionSaved.getId(), NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO);

        peticionService.reject(rechazoDTO);

        Peticion peticionFromDb = peticionService.findById(peticionSaved.getId()).get();

        assertEquals(NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO, peticionFromDb.getMotivoRechazo());

    }

    @Test
    public void unInmuebleEsReservadoPorUnUsuarioYLuegoCanceladoPorAlguienQueNoEsSuDueñoYNoHaceNada() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        Peticion peticionSaved = peticionService.create(peticionDeJorge);

        RechazoDTO rechazoDTO = new RechazoDTO(jorge.getId(), peticionSaved.getId(), NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO);

        peticionService.reject(rechazoDTO);

        Peticion peticionFromDb = peticionService.findById(peticionSaved.getId()).get();

        assertNull(peticionFromDb.getMotivoRechazo());
        assertInstanceOf(Pendiente.class, peticionFromDb.getEstado());

    }

    @Test
    public void unaPeticionQueNoExisteNoEsPosibleDeCancelar() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        RechazoDTO rechazoDTO = new RechazoDTO(jorge.getId(), -1L, NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO);


        assertDoesNotThrow(() -> {peticionService.reject(rechazoDTO);});

    }

    @Test
    public void unInmuebleEsReservadoPorUnUsuario() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);
        inmuebleService.create(inmueble, emptyImages);

        Peticion peticionSaved = peticionService.create(peticionDeJorge);
        peticionService.approve(peticionDeJorge.getId());

        Peticion peticionFromDb = peticionService.findById(peticionSaved.getId()).get();

        assertInstanceOf(Vigente.class, peticionFromDb.getEstado());

    }

    @Test
    public void unInmuebleEsReservadoPorUnUsuarioYLuegoOtroUsuarioQuiereReservarALaVezEntoncesSeTiraException() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);
        usuarioService.create(alan);
        inmuebleService.create(inmueble, emptyImages);

         peticionService.create(peticionDeJorge);
        Peticion peticionAlanSaved = peticionService.create(peticionDeAlanNoVigente);

        peticionService.approve(peticionDeJorge.getId());

        assertThrows(HorarioOcupado.class, () -> peticionService.approve(peticionAlanSaved.getId()));


    }




    @AfterEach
    void limpiarDb(){
        testService.eliminarPeticiones();
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();
    }
}
