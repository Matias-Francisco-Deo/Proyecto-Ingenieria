package com.reservo.service.impl;

import com.reservo.modelo.property.enums.DiasDeLaSemana;
import com.reservo.modelo.politicasDeCancelacion.SinDevolucion;
import com.reservo.modelo.reserva.Peticion;
import com.reservo.controller.dto.Peticion.RechazoDTO;
import com.reservo.modelo.reserva.estadosReservas.Cancelado;
import com.reservo.modelo.reserva.estadosReservas.Pendiente;
import com.reservo.modelo.reserva.estadosReservas.Vigente;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.user.Usuario;
import com.reservo.persistencia.DAO.PeticionDAO;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
@SpringBootTest
public class PeticionServiceImplTest {

    public static final String NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO = "No me gustó la comida de ganzo.";
    @Autowired
    private TestService testService; // cambiar por uno para inmueble

    @Autowired
    private PeticionService peticionService;

    @Autowired
    private PeticionDAO peticionDAO;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private InmuebleService inmuebleService;

    private Usuario jorge;
    private Usuario alan;
    private Usuario raul;
    private Inmueble inmueble;
    private List<MultipartFile> emptyImages;
    private Peticion peticionDeJorge;
    private Peticion peticionDeAlan;
    private Peticion peticionDeAlanNoVigente;
    private Peticion peticionDeprecada;
    private RechazoDTO rechazoDTO;
    private List<DiasDeLaSemana> emptyDays;
    Inmueble savedIn;

    @BeforeEach
    public void setUp() throws EmailRepetido {

        emptyDays = Collections.emptyList();

        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        alan = new Usuario("alan", "aa21", "alan@yahoo.com.ar");
        raul = new Usuario("raul", "aa21", "raul@yahoo.com.ar");

        inmueble = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.now().plusMinutes(30), LocalTime.now().plusHours(1), raul, new SinDevolucion(),"lavalle",987);

        inmueble.setAvailableDays(Collections.emptyList());

        emptyImages = Collections.emptyList();

        usuarioService.create(jorge);
        usuarioService.create(alan);
        usuarioService.create(raul);
         savedIn = inmuebleService.create(inmueble, emptyImages);

        peticionDeJorge = new Peticion(jorge, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);
        peticionDeAlan = new Peticion(alan, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(45), LocalTime.now().plusMinutes(55), 100D);
        peticionDeAlan.setEstado(new Vigente());

        peticionDeAlanNoVigente = new Peticion(alan, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(45), LocalTime.now().plusMinutes(55), 100D);
        peticionDeprecada = new Peticion(alan, inmueble, LocalDate.now().minusDays(10),LocalTime.now().minusMinutes(45), LocalTime.now().minusMinutes(55), 100D);

        
    }

    @Test
    public void solicitaLaPlazaElUsuarioJorge() {




        Peticion peticionSaved = peticionService.create(peticionDeJorge);

        Optional<Peticion> peticionGot = peticionService.findById(peticionSaved.getId());

        assertTrue(peticionGot.isPresent());
    }
    @Test
    public void solicitaLaPlazaElUsuarioJorgePeroAlanYaLaSolicito() throws EmailRepetido {






        peticionService.create(peticionDeAlan);

        assertThrows(HorariosSuperpuestos.class, () -> peticionService.create(peticionDeJorge));
    }

    @Test
    public void solicitaLaPlazaElUsuarioJorgePeroTieneLosHorariosDesordenados() throws EmailRepetido {




        LocalTime horaInicio = peticionDeJorge.getHoraInicio();


        peticionDeJorge.setHoraInicio(peticionDeJorge.getHoraFin());
        peticionDeJorge.setHoraFin(horaInicio);


        assertThrows(HorarioDesordenado.class, () -> peticionService.create(peticionDeJorge));
    }

    @Test
    public void solicitaLaPlazaElUsuarioJorgePeroLosHorariosNoEstanContenidosPorLosHorariosDelInmueble() throws EmailRepetido {




        peticionDeJorge.setHoraInicio(inmueble.getHoraInicio().minusMinutes(1));


        assertThrows(RangoDeHorarioSuperado.class, () -> peticionService.create(peticionDeJorge));
    }

    @Test
    public void elViajeroEnElTiempoSolicitaLaPlaza() throws EmailRepetido {


        inmueble.setHoraInicio(LocalTime.now().minusMinutes(40));
        inmueble.setHoraFin(LocalTime.now().plusHours(1));



        peticionDeJorge.setFechaDelEvento(LocalDate.now().minusDays(1));
        peticionDeJorge.setHoraInicio(LocalTime.now().minusMinutes(30));
        peticionDeJorge.setHoraFin(LocalTime.now().plusMinutes(30));

        assertThrows(VieneDelPasado.class, () -> peticionService.create(peticionDeJorge));
    }

    @Test
    public void jorgeIntentaPedirDosVecesLaPlaza() throws EmailRepetido {




        peticionService.create(peticionDeJorge);

        Peticion peticionPe = new Peticion(jorge, inmueble, LocalDate.now(),LocalTime.now().minusSeconds(40), LocalTime.now().minusSeconds(50), 100D);

        assertThrows(RealizoUnaPeticionSobreElInmuebleEnElMismoDia.class, () -> peticionService.create(peticionPe));


    }

    @Test
    public void jorgeSolicitaLasPeticionesVigentesDeHoy() throws EmailRepetido {



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




        Peticion peticionRaul = new Peticion(raul, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);

        assertThrows(EsDueñoDeLaPropiedadSolicitada.class, () -> peticionService.create(peticionRaul));
    }

    @Test
    public void unInmuebleEsReservadoPorUnUsuarioYLuegoCanceladoPorSuDueñoYSuEstadoPasaARechazado() throws EmailRepetido {




        Peticion peticionSaved = peticionService.create(peticionDeJorge);

        peticionService.reject(new RechazoDTO(raul.getId(), peticionSaved.getId(), NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO));

        Peticion peticionFromDb = peticionService.findById(peticionSaved.getId()).get();

        assertInstanceOf(Cancelado.class, peticionFromDb.getEstado());

    }

    @Test
    public void unInmuebleEsReservadoPorUnUsuarioYLuegoCanceladoPorSuDueñoYTieneMensajeDeRechazo() throws EmailRepetido {




        Peticion peticionSaved = peticionService.create(peticionDeJorge);

        RechazoDTO rechazoDTO = new RechazoDTO(raul.getId(), peticionSaved.getId(), NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO);

        peticionService.reject(rechazoDTO);

        Peticion peticionFromDb = peticionService.findById(peticionSaved.getId()).get();

        assertEquals(NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO, peticionFromDb.getMotivoCancelacionRechazo());

    }

    @Test
    public void unInmuebleEsReservadoPorUnUsuarioYLuegoCanceladoPorAlguienQueNoEsSuDueñoYNoHaceNada() throws EmailRepetido {




        Peticion peticionSaved = peticionService.create(peticionDeJorge);

        RechazoDTO rechazoDTO = new RechazoDTO(jorge.getId(), peticionSaved.getId(), NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO);

        peticionService.reject(rechazoDTO);

        Peticion peticionFromDb = peticionService.findById(peticionSaved.getId()).get();

        assertNull(peticionFromDb.getMotivoCancelacionRechazo());
        assertInstanceOf(Pendiente.class, peticionFromDb.getEstado());

    }

    @Test
    public void unaPeticionQueNoExisteNoEsPosibleDeCancelar() throws EmailRepetido {


        RechazoDTO rechazoDTO = new RechazoDTO(jorge.getId(), -1L, NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO);


        assertDoesNotThrow(() -> {peticionService.reject(rechazoDTO);});

    }

    @Test
    public void unInmuebleEsReservadoPorUnUsuario() throws EmailRepetido {



        Peticion peticionSaved = peticionService.create(peticionDeJorge);
        peticionService.approve(peticionDeJorge.getId());

        Peticion peticionFromDb = peticionService.findById(peticionSaved.getId()).get();

        assertInstanceOf(Vigente.class, peticionFromDb.getEstado());

    }

    @Test
    public void unInmuebleEsReservadoPorUnUsuarioYLuegoOtroUsuarioQuiereReservarALaVezEntoncesSeTiraException() throws EmailRepetido {




         peticionService.create(peticionDeJorge);
        Peticion peticionAlanSaved = peticionService.create(peticionDeAlanNoVigente);

        peticionService.approve(peticionDeJorge.getId());

        assertThrows(HorarioOcupado.class, () -> peticionService.approve(peticionAlanSaved.getId()));

    }

    @Test
    public void unaPeticionNoPuedeSerAceptadaMasDeUnaVezYNoHaceNada() throws EmailRepetido {



        Peticion peticionSaved = peticionService.create(peticionDeJorge);
        peticionService.approve(peticionDeJorge.getId());

        assertDoesNotThrow(() -> {peticionService.approve(peticionDeJorge.getId());});

    }

    @Test
    public void unaPeticionNoPuedeSerRechazadaMasDeUnaVezYNoHaceNada() throws EmailRepetido {



        Peticion peticionSaved = peticionService.create(peticionDeJorge);
        RechazoDTO rechazoDTO = new RechazoDTO(jorge.getId(), peticionSaved.getId(), NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO);
        peticionService.reject(rechazoDTO);

        assertDoesNotThrow(() -> {peticionService.reject(rechazoDTO);});

    }

    @Test
    public void unaPeticionNoPuedeSerRechazadaLuegoDeSerAceptada() throws EmailRepetido {



        Peticion peticionSaved = peticionService.create(peticionDeJorge);
        RechazoDTO rechazoDTO = new RechazoDTO(jorge.getId(), peticionSaved.getId(), NO_ME_GUSTÓ_LA_COMIDA_DE_GANZO);
        peticionService.approve(peticionDeJorge.getId());

        assertThrows(PeticionYaVigente.class,() -> {peticionService.reject(rechazoDTO);});
    }

    @Test
    public void unaPeticionVencidaNoPuedeSerRechazada() throws EmailRepetido {




        Peticion peticionSaved = peticionDAO.save(peticionDeprecada);

        assertThrows(PeticionVencida.class,() -> {peticionService.approve(peticionSaved.getId());});
    }

    @Test
    public void unaPeticionVencidaNoPuedeSerAprobada() throws EmailRepetido {




        Peticion peticionSaved = peticionDAO.save(peticionDeprecada);

        assertThrows(PeticionVencida.class,() -> {peticionService.approve(peticionSaved.getId());});
    }


    @Test
    public void jorgeSolicitaSuListadoDeReservasPendientes() throws EmailRepetido {



        for (int i = 0; i < 20; i++) {
            peticionDeJorge = new Peticion(jorge, inmueble, LocalDate.now().plusDays(i),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);
            peticionService.create(peticionDeJorge);
        }

        Page<Peticion> pagina1 = peticionService.findAllReservasPendientesByUserId(jorge.getId(), PageRequest.of(0, 5));

        assertFalse(pagina1.isEmpty());
        assertEquals(5, pagina1.getContent().size());
        pagina1.getContent().forEach(peticion -> {
            assertEquals(jorge.getId(), peticion.getCliente().getId());
        });
        List<LocalDate> fechas = pagina1.getContent().stream()
                .map(Peticion::getFechaDelEvento)
                .toList();


        List<LocalDate> fechasOrdenadas = new ArrayList<>(fechas);
        Collections.sort(fechasOrdenadas);

        assertEquals(fechasOrdenadas, fechas);

        Page<Peticion> pagina2 = peticionService.findAllReservasPendientesByUserId(
                jorge.getId(), PageRequest.of(1, 5));

        assertEquals(5, pagina2.getContent().size());
    }

    @Test
    public void jorgeSolicitaSuListadoDeReservasCanceladas() throws EmailRepetido {



        for (int i = 0; i < 20; i++) {
            peticionDeJorge = new Peticion(jorge, inmueble, LocalDate.now().plusDays(i),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);
            peticionDeJorge.setEstado(new Cancelado());
            peticionService.create(peticionDeJorge);
        }

        Page<Peticion> pagina1 = peticionService.findAllReservasCanceladasByUserId(jorge.getId(), PageRequest.of(0, 5));

        assertFalse(pagina1.isEmpty());
        assertEquals(5, pagina1.getContent().size());
        pagina1.getContent().forEach(peticion -> {
            assertEquals(jorge.getId(), peticion.getCliente().getId());
        });
        List<LocalDate> fechas = pagina1.getContent().stream()
                .map(Peticion::getFechaDelEvento)
                .toList();


        List<LocalDate> fechasOrdenadas = new ArrayList<>(fechas);
        Collections.sort(fechasOrdenadas);

        assertEquals(fechasOrdenadas, fechas);

        Page<Peticion> pagina2 = peticionService.findAllReservasCanceladasByUserId(
                jorge.getId(), PageRequest.of(1, 5));

        assertEquals(5, pagina2.getContent().size());
    }

    @Test
    public void jorgeSolicitaSuListadoDeReservasVigentes() {



        for (int i = 0; i < 20; i++) {
            peticionDeJorge = new Peticion(jorge, inmueble, LocalDate.now().plusDays(i),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);
            peticionDeJorge.setEstado(new Vigente());
            peticionService.create(peticionDeJorge);
        }

        Page<Peticion> pagina1 = peticionService.findAllReservasVigentesByUserId(jorge.getId(), PageRequest.of(0, 5));

        assertFalse(pagina1.isEmpty());
        assertEquals(5, pagina1.getContent().size());
        pagina1.getContent().forEach(peticion -> {
            assertEquals(jorge.getId(), peticion.getCliente().getId());
        });
        List<LocalDate> fechas = pagina1.getContent().stream()
                .map(Peticion::getFechaDelEvento)
                .toList();


        List<LocalDate> fechasOrdenadas = new ArrayList<>(fechas);
        Collections.sort(fechasOrdenadas);

        assertEquals(fechasOrdenadas, fechas);

        Page<Peticion> pagina2 = peticionService.findAllReservasVigentesByUserId(
                jorge.getId(), PageRequest.of(1, 5));

        assertEquals(5, pagina2.getContent().size());
    }


    @AfterEach
    void limpiarDb(){
        testService.eliminarPeticiones();
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();
    }
}
