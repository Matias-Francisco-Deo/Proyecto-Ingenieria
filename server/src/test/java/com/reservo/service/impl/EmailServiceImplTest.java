package com.reservo.service.impl;

import com.reservo.controller.CancelacionDTO;
import com.reservo.controller.dto.Peticion.RechazoDTO;
import com.reservo.modelo.property.DiasDeLaSemana;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.PoliticasDeCancelacion;
import com.reservo.modelo.property.SinDevolucion;
import com.reservo.modelo.reserva.Peticion;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.EmailService;
import com.reservo.service.InmuebleService;
import com.reservo.service.PeticionService;
import com.reservo.service.UsuarioService;
import com.reservo.service.exception.EmailRepetido;
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


//@Profile("emailtest")
@SpringBootTest
public class EmailServiceImplTest {
    @Autowired
    private TestService testService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PeticionService peticionService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private InmuebleService inmuebleService;

    private Usuario matias;
    private Usuario alan;
    private Usuario raul;
    private PoliticasDeCancelacion cancellation;
    private Inmueble inmueble;
    private List<MultipartFile> emptyImages;
    private Peticion peticionDeMatias;
    private Peticion peticionDeAlan;
    private Peticion peticionDeAlanNoVigente;
    private Peticion peticionDeprecada;
    private RechazoDTO rechazoDTO;
    private List<DiasDeLaSemana> emptyDays;

    @BeforeEach
    void crearInstancias() {
        emptyDays = Collections.emptyList();

        matias = new Usuario("matiasElCapo", "aa21", "matiasfd.deo@gmail.com");
        alan = new Usuario("alan", "aa21", "matiasfd.deo@gmail.com");
        raul = new Usuario("raul", "aa21", "rockito10.mfd@gmail.com");

        inmueble = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.now().plusMinutes(30), LocalTime.now().plusHours(1), raul, new SinDevolucion(),"lavalle",987);

        inmueble.setAvailableDays(Collections.emptyList());

        emptyImages = Collections.emptyList();

        peticionDeMatias = new Peticion(matias, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(40), LocalTime.now().plusMinutes(50), 100D);
//        peticionDeAlan = new Peticion(alan, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(45), LocalTime.now().plusMinutes(55), 100D);


        peticionDeAlanNoVigente = new Peticion(alan, inmueble, LocalDate.now(),LocalTime.now().plusMinutes(45), LocalTime.now().plusMinutes(55), 100D);
        peticionDeprecada = new Peticion(alan, inmueble, LocalDate.now().minusDays(10),LocalTime.now().minusMinutes(45), LocalTime.now().minusMinutes(55), 100D);
    }

    @Test
    public void testEmailService() {
        emailService.sendSimpleEmail("matiasfd.deo@gmail.com", "woo pish", "BIENVENIDOS A TODOS A OTRO VIDEO DE DEIGAMER DONDE DISFRUTARÁS DE ALGO DIFERENTE");
    }

    @Test
    public void testSeEnviaMensajeCuandoSeApruebaMiReserva() throws EmailRepetido {
        usuarioService.create(matias);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        peticionService.create(peticionDeMatias);

        peticionService.approve(peticionDeMatias.getId());

    }

    @Test
    public void testSeEnviaMensajeCuandoSeRechazaMiReserva() throws EmailRepetido {
        usuarioService.create(matias);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        peticionService.create(peticionDeMatias);

        peticionService.reject(new RechazoDTO(raul.getId(), peticionDeMatias.getId(), "TENGOS MIS MOTIVOS OK :)"));

    }

    @Test
    public void testSeEnviaMensajeCuandoSeRechazaMiReservaSinMotivoYSeAdapta() throws EmailRepetido {
        usuarioService.create(matias);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        peticionService.create(peticionDeMatias);

        // debe comerse parte del texto para que no quede horrible
        peticionService.reject(new RechazoDTO(raul.getId(), peticionDeMatias.getId(), ""));

    }

    @Test
    public void testSeEnviaMensajeCuandoSeCancelaAlClienteConMotivoYNoSeMuestra() throws EmailRepetido {
        usuarioService.create(matias);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        peticionService.create(peticionDeMatias);

        peticionService.cancel(new CancelacionDTO(matias.getId(), peticionDeMatias.getId(), "Pepe"));

    }

    @Test
    public void testSeEnviaMensajeCuandoSeCancelaAlClienteSinMotivoYNoSeMuestraNadaAdicional() throws EmailRepetido {
        usuarioService.create(matias);
        usuarioService.create(raul);

        inmuebleService.create(inmueble, emptyImages);

        peticionService.create(peticionDeMatias);

        peticionService.cancel(new CancelacionDTO(matias.getId(), peticionDeMatias.getId(), ""));

    }


    @AfterEach
    void limpiarDb(){
        testService.eliminarPeticiones();
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();
    }
}
