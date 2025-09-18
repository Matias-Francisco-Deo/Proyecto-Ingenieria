package com.reservo.service.impl;

import com.reservo.modelo.Peticion;
import com.reservo.modelo.estadosReservas.Pendiente;
import com.reservo.modelo.estadosReservas.Vigente;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.PoliticasDeCancelacion;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.InmuebleService;
import com.reservo.service.PeticionService;
import com.reservo.service.UsuarioService;
import com.reservo.service.exception.*;
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
import java.util.Objects;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PeticionServiceImplTest {

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
    private Peticion peticion;
    private Peticion peticion2;


    @BeforeEach
    public void setUp() {


        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        alan = new Usuario("alan", "aa21", "alan@yahoo.com.ar");
        raul = new Usuario("alan", "aa21", "raul@yahoo.com.ar");

        inmueble = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.now().plusMinutes(30), LocalTime.now().plusHours(1), raul, PoliticasDeCancelacion.SIN_RETRIBUCION);

        emptyImages = Collections.emptyList();

        peticion = new Peticion(jorge, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);
        peticion2 = new Peticion(alan, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(45), LocalTime.now().plusMinutes(55), 100D);
        peticion2.setEstado(new Vigente());

    }

    @Test
    public void solicitaLaPlazaElUsuarioJorge() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        Peticion peticionSaved = peticionService.create(peticion);

        Optional<Peticion> peticionGetted = peticionService.findById(peticionSaved.getId());

        assertTrue(peticionGetted.isPresent());
    }

    @Test
    public void solicitaLaPlazaElUsuarioJorgePeroAlanYaLaSolicito() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(alan);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        peticionService.create(peticion2);

        assertThrows(HorariosSuperpuestos.class, () -> peticionService.create(peticion));
    }

    @Test
    public void solicitaLaPlazaElUsuarioJorgePeroTieneLosHorariosDesordenados() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        LocalTime horaInicio = peticion.getHoraInicio();


        peticion.setHoraInicio(peticion.getHoraFin());
        peticion.setHoraFin(horaInicio);


        assertThrows(HorarioDesordenado.class, () -> peticionService.create(peticion));
    }

    @Test
    public void solicitaLaPlazaElUsuarioJorgePeroLosHorariosNoEstanContenidosPorLosHorariosDelInmueble() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        peticion.setHoraInicio(inmueble.getHoraInicio().minusMinutes(1));


        assertThrows(RangoDeHorarioSuperado.class, () -> peticionService.create(peticion));
    }

    @Test
    public void elViajeroEnElTiempoSolicitaLaPlaza() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmueble.setHoraInicio(LocalTime.now().minusMinutes(40));
        inmueble.setHoraFin(LocalTime.now().plusHours(1));

        inmuebleService.create(inmueble, emptyImages);

        peticion.setFechaDelEvento(LocalDate.now().minusDays(1));
        peticion.setHoraInicio(LocalTime.now().minusMinutes(30));
        peticion.setHoraFin(LocalTime.now().plusMinutes(30));

        assertThrows(VieneDelPasado.class, () -> peticionService.create(peticion));
    }

    @Test
    public void jorgeIntentaPedirDosVecesLaPlaza() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        peticionService.create(peticion);

        Peticion peticionPe = new Peticion(jorge, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);

        assertThrows(RealizoUnaPeticionSobreElInmuebleEnElMismoDia.class, () -> peticionService.create(peticionPe));


    }

    @Test
    public void jorgeSolicitaLasPeticionesVigentesDeHoy() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(alan);
        usuarioService.create(raul);

        Inmueble savedIn = inmuebleService.create(inmueble, emptyImages);

        peticion.setEstado(new Vigente());
        Peticion savedPeticion = peticionService.create(peticion);

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


    @AfterEach
    void limpiarDb(){
        testService.eliminarPeticiones();
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();
    }
}
