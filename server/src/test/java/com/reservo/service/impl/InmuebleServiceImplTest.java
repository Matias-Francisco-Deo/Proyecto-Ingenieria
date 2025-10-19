package com.reservo.service.impl;

import com.reservo.controller.dto.Inmueble.InmuebleModifyRequestDTO;
import com.reservo.controller.dto.Inmueble.InmuebleRemoveImagesDTO;
import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.Filtro;
import com.reservo.modelo.politicasDeCancelacion.Flexible;
import com.reservo.modelo.property.*;
import com.reservo.modelo.property.enums.DiasDeLaSemana;
import com.reservo.modelo.politicasDeCancelacion.SinDevolucion;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
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
    private List<MultipartFile> emptyImages;
    private InmuebleModifyRequestDTO inmuebleDTO1;
    private MockMultipartFile mockImage;
    private InmuebleRemoveImagesDTO removeImagesDTO;

    @BeforeEach
    public void setUp() throws EmailRepetido {

        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        juan = new Usuario("juan", "aa22", "juan@yahoo.com.ar");

        inmueble1 = new Inmueble(
                "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(),"lavalle",987);

        inmueble2 = new Inmueble(
                "Quincho", "Es un lugar espacioso", 200d,"Quilmes", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), juan, new SinDevolucion(),"pelegrini",123);

        emptyImages = Collections.emptyList();
        inmueble1.setAvailableDays(Collections.emptyList());
        inmueble2.setAvailableDays(Collections.emptyList());

        List<DiasDeLaSemana> diasDTOInmueble = List.of(DiasDeLaSemana.LUNES);
        inmuebleDTO1 = new InmuebleModifyRequestDTO("Palacio de la bondad", "full bondad pa", "Quilmes", 18000d, 35, "romper todo", "10:00", "18:00", diasDTOInmueble, "Flexible", "Balcarce", 50);

        mockImage = new MockMultipartFile(
                "image",
                "pepeEnLaDucha.jpg",
                "image/jpeg",
                "fake-image-content".getBytes()
        );

        removeImagesDTO = new InmuebleRemoveImagesDTO(List.of(0));

        userService.create(jorge);
        userService.create(juan);
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

        inmuebleService.create(inmueble1,emptyImages);
        inmuebleService.create(inmueble2,emptyImages);

        List<Inmueble> inmuebles = inmuebleService.findAll();

        assertEquals(2, inmuebles.size());
    }
    @Test
    public void seBuscaLosInmueblesConLaInicialPYTraeDosPaginas() throws EmailRepetido {
        userService.create(jorge);


        for (int i = 0; i < 10; i++) {
            Inmueble inm = new Inmueble(
                    "Plaza" + i, "Es un lugar espacioso", 200d, "Quilmes", 100, "No romper nada",
                    LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(), "lavalle", 987);
            inm.setAvailableDays(Collections.emptyList());
            inmuebleService.create(inm, emptyImages);
        }


        int pageSize = 5;


        Filtro filtroPagina1 = new Filtro(
                "",
                "P",
                null,
                null,
                PageRequest.of(0, pageSize)
        );
        Page<Inmueble> pagina1 = inmuebleService.findByFiltro(filtroPagina1);

        assertFalse(pagina1.isEmpty());
        assertEquals(pageSize, pagina1.getContent().size());
        pagina1.getContent().forEach(inmueble -> {
            assertTrue(inmueble.getName().startsWith("P"));
        });


        Filtro filtroPagina2 = new Filtro(
                "",
                "P",
                null,
                null,
                PageRequest.of(1, pageSize)
        );
        Page<Inmueble> pagina2 = inmuebleService.findByFiltro(filtroPagina2);

        assertFalse(pagina2.isEmpty());
        assertEquals(pageSize, pagina2.getContent().size());
        pagina2.getContent().forEach(inmueble -> {
            assertTrue(inmueble.getName().startsWith("P"));
        });


        assertNotEquals(pagina1.getContent(), pagina2.getContent());

        assertEquals(2, pagina1.getTotalPages());
        assertEquals(2, pagina2.getTotalPages());
    }

    @Test
    void noPuedenHaberDosUsuariosConElInmueble() throws EmailRepetido {

        inmuebleService.create(inmueble1,emptyImages);

        assertThrows(InmuebleRepetidoException.class, () -> {inmuebleService.create(inmueble1,emptyImages);});
    }

    @Test
    void seActualizaUnInmuebleYCambiaSuNombreAlNuevo() throws EmailRepetido, ParametroIncorrecto {

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals("Palacio de la bondad", inmuebleFromDb.getName());
    }

    @Test
    void seActualizaUnInmuebleYCambiaSuDescripcionALaNueva() throws EmailRepetido, ParametroIncorrecto {
//        inmuebleDTO1 = new InmuebleModifyRequestDTO("Palacio de la bondad", "full bondad pa", "Quilmes", 18000d, 35, "romper todo", "10:00", "18:00", diasDTOInmueble, "Flexible", "Balcarce", 50);

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals("full bondad pa", inmuebleFromDb.getDescription());
    }

    @Test
    void seActualizaUnInmuebleYCambiaSuLocalidadALaNueva() throws EmailRepetido, ParametroIncorrecto {
//        inmuebleDTO1 = new InmuebleModifyRequestDTO("Palacio de la bondad", "full bondad pa", "Quilmes", 18000d, 35, "romper todo", "10:00", "18:00", diasDTOInmueble, "Flexible", "Balcarce", 50);

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals("Quilmes", inmuebleFromDb.getUbication());
    }

    @Test
    void seActualizaUnInmuebleYCambiaSuPrecioAlNuevo() throws EmailRepetido, ParametroIncorrecto {
//        inmuebleDTO1 = new InmuebleModifyRequestDTO("Palacio de la bondad", "full bondad pa", "Quilmes", 18000d, 35, "romper todo", "10:00", "18:00", diasDTOInmueble, "Flexible", "Balcarce", 50);

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals(18000, inmuebleFromDb.getPrice());
    }


    @Test
    void seActualizaUnInmuebleYCambiaSuCapacidadALaNueva() throws EmailRepetido, ParametroIncorrecto {
//        inmuebleDTO1 = new InmuebleModifyRequestDTO("Palacio de la bondad", "full bondad pa", "Quilmes", 18000d, 35, "romper todo", "10:00", "18:00", diasDTOInmueble, "Flexible", "Balcarce", 50);

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals(35, inmuebleFromDb.getCapacity());
    }

    @Test
    void seActualizaUnInmuebleYCambiaSusCondicionesALasNuevas() throws EmailRepetido, ParametroIncorrecto {
//        inmuebleDTO1 = new InmuebleModifyRequestDTO("Palacio de la bondad", "full bondad pa", "Quilmes", 18000d, 35, "romper todo", "10:00", "18:00", diasDTOInmueble, "Flexible", "Balcarce", 50);

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals("romper todo", inmuebleFromDb.getConditions());
    }

    @Test
    void seActualizaUnInmuebleParcialmenteYCambiaSusCondicionesALasNuevas() throws EmailRepetido, ParametroIncorrecto {
        inmuebleDTO1 = new InmuebleModifyRequestDTO(null, "full bondad pa", "Quilmes", 18000d, 35, "romper todo", "10:00", "18:00", null, null, "Balcarce", 50);

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals("romper todo", inmuebleFromDb.getConditions());
    }

    @Test
    void seActualizaUnInmuebleYCambiaSusHorariosALosNuevos() throws EmailRepetido, ParametroIncorrecto {
//        inmuebleDTO1 = new InmuebleModifyRequestDTO("Palacio de la bondad", "full bondad pa", "Quilmes", 18000d, 35, "romper todo", "10:00", "18:00", diasDTOInmueble, "Flexible", "Balcarce", 50);

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals(LocalTime.parse("10:00"), inmuebleFromDb.getHoraInicio());
        assertEquals(LocalTime.parse("18:00"), inmuebleFromDb.getHoraFin());
    }

    @Test
    void seActualizaUnInmuebleYCambiaSusDiasDisponiblesALosNuevos() throws EmailRepetido, ParametroIncorrecto {
//        inmuebleDTO1 = new InmuebleModifyRequestDTO("Palacio de la bondad", "full bondad pa", "Quilmes", 18000d, 35, "romper todo", "10:00", "18:00", diasDTOInmueble, "Flexible", "Balcarce", 50);

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals(List.of(DiasDeLaSemana.LUNES), inmuebleFromDb.getAvailableDays());

    }

    @Test
    void seActualizaUnInmuebleYCambiaSuPoliticaDeCancelacionALaNueva() throws EmailRepetido, ParametroIncorrecto {
//        inmuebleDTO1 = new InmuebleModifyRequestDTO("Palacio de la bondad", "full bondad pa", "Quilmes", 18000d, 35, "romper todo", "10:00", "18:00", diasDTOInmueble, "Flexible", "Balcarce", 50);

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals(Flexible.class, inmuebleFromDb.getCancellation().getClass());

    }

    @Test
    void seActualizaUnInmuebleYCambiaSuDireccionALaNueva() throws EmailRepetido, ParametroIncorrecto {
//        inmuebleDTO1 = new InmuebleModifyRequestDTO("Palacio de la bondad", "full bondad pa", "Quilmes", 18000d, 35, "romper todo", "10:00", "18:00", diasDTOInmueble, "Flexible", "Balcarce", 50);

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals("Balcarce", inmuebleFromDb.getCalle());
        assertEquals(50, inmuebleFromDb.getAltura());

    }

    @Test
    void seActualizaUnInmuebleParcialmenteYCambiaSuDireccionALaNueva() throws EmailRepetido, ParametroIncorrecto {
        inmuebleDTO1 = new InmuebleModifyRequestDTO(null, "full bondad pa", null, 18000d, 35, "romper todo", "10:00", "18:00", null, "Flexible", "Balcarce", 50);

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals("Balcarce", inmuebleFromDb.getCalle());
        assertEquals(50, inmuebleFromDb.getAltura());

    }

    @Test
    void seActualizaUnInmuebleParcialmenteYCambianLasCosasQueSeEspecifican() throws EmailRepetido, ParametroIncorrecto {
        inmuebleDTO1 = new InmuebleModifyRequestDTO(null, null, null, 18000d, 35, null, "10:00", "18:00", null, null, "Balcarce", 50);

        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.update(inmueble1.getId(), inmuebleDTO1);

        Inmueble inmuebleFromDb = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals("Balcarce", inmuebleFromDb.getCalle());
        assertEquals(50, inmuebleFromDb.getAltura());
        assertEquals(LocalTime.parse("10:00"), inmuebleFromDb.getHoraInicio());
        assertEquals(LocalTime.parse("18:00"), inmuebleFromDb.getHoraFin());
        assertEquals(18000, inmuebleFromDb.getPrice());
        assertEquals(35, inmuebleFromDb.getCapacity());

    }

    @Test
    void noSeActualizaLaImagenDeUnInmuebleCuandoSeMandaNada() throws ParametroIncorrecto {
        inmuebleDTO1 = new InmuebleModifyRequestDTO(null, null, null, null, null, null, null, null, null, null, null, null);


        inmueble1.setImages(List.of(new ReservoImage("pepe", "c://pepe.png")) );
        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.addImages(inmueble1.getId(), emptyImages);

        Inmueble inmuebleFromDb2 = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals(1,  inmuebleFromDb2.getImages().size());

    }

    @Test
    void seAgregaUnaImagenDeUnInmueble() throws ParametroIncorrecto {


        inmueble1.setImages(List.of(new ReservoImage("pepe", "c://pepe.png")) );
        inmuebleService.create(inmueble1,emptyImages);

        inmuebleService.addImages(inmueble1.getId(), List.of(mockImage));

        Inmueble inmuebleFromDb2 = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals(2,  inmuebleFromDb2.getImages().size());

    }

    @Test
    void seQuitaUnaImagenDeUnInmueble() throws ParametroIncorrecto {


        inmuebleService.create(inmueble1,List.of(mockImage)); // 1

        inmuebleService.removeImages(inmueble1.getId(), removeImagesDTO);

        Inmueble inmuebleFromDb2 = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals(0,  inmuebleFromDb2.getImages().size());

    }

    @Test
    void seQuitanTodasLasImagenesDeUnInmueble() throws EmailRepetido, ParametroIncorrecto {
        removeImagesDTO = new InmuebleRemoveImagesDTO(List.of(0, 1));


        inmuebleService.create(inmueble1,List.of(mockImage, mockImage)); // 2

        inmuebleService.removeImages(inmueble1.getId(), removeImagesDTO);

        Inmueble inmuebleFromDb2 = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals(0,  inmuebleFromDb2.getImages().size());

    }

    @Test
    void seQuitanImagenesDeUnInmuebleSalteadas() throws EmailRepetido, ParametroIncorrecto {
        removeImagesDTO = new InmuebleRemoveImagesDTO(List.of(0, 1, 3));


        inmuebleService.create(inmueble1,List.of(mockImage, mockImage, mockImage, mockImage)); // 4

        inmuebleService.removeImages(inmueble1.getId(), removeImagesDTO);

        Inmueble inmuebleFromDb2 = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals(1,  inmuebleFromDb2.getImages().size());

    }

    @Test
    void seQuitanImagenesDeUnInmuebleSalteadasDePrincipioAFin() throws EmailRepetido, ParametroIncorrecto {
        removeImagesDTO = new InmuebleRemoveImagesDTO(List.of(0, 3));


        inmuebleService.create(inmueble1,List.of(mockImage, mockImage, mockImage, mockImage)); // 4

        inmuebleService.removeImages(inmueble1.getId(), removeImagesDTO);

        Inmueble inmuebleFromDb2 = inmuebleService.findById(inmueble1.getId()).get();

        assertEquals(2,  inmuebleFromDb2.getImages().size());

    }

    @Test
    public void seBuscaUbicacionDeInmuebleConTildesYTraeResultadosComoSiNoTuviera() throws EmailRepetido {
        userService.create(jorge);


        Inmueble inm = new Inmueble(
                    "Quincho", "Es un lugar espacioso", 200d, "Moron", 100, "No romper nada",
                    LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(), "lavalle", 987);
        inm.setAvailableDays(Collections.emptyList());
        inmuebleService.create(inm, emptyImages);


        int pageSize = 1;

        Filtro filtroPagina1 = new Filtro(
                "morón",
                "q",
                null,
                null,
                PageRequest.of(0, pageSize)
        );
        Inmueble inmueble = inmuebleService.findByFiltro(filtroPagina1).toList().getFirst();

        assertEquals("Quincho", inmueble.getName());
        assertEquals("Moron", inmueble.getUbication());

    }

    @Test
    public void seBuscaUbicacionDeInmuebleSinTildesYTraeResultadosComoSiTuviera() throws EmailRepetido {
        userService.create(jorge);


        Inmueble inm = new Inmueble(
                "Quincho", "Es un lugar espacioso", 200d, "Morón", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(), "lavalle", 987);
        inm.setAvailableDays(Collections.emptyList());
        inmuebleService.create(inm, emptyImages);


        int pageSize = 1;

        Filtro filtroPagina1 = new Filtro(
                "moron",
                "q",
                null,
                null,
                PageRequest.of(0, pageSize)
        );
        Inmueble inmueble = inmuebleService.findByFiltro(filtroPagina1).toList().getFirst();

        assertEquals("Quincho", inmueble.getName());
        assertEquals("Morón", inmueble.getUbication());

    }

    @Test
    public void seBuscaNombreDeInmuebleConTildesYTraeResultadosComoSiNoTuviera() throws EmailRepetido {
        userService.create(jorge);


        Inmueble inm = new Inmueble(
                "ia", "Es un lugar espacioso", 200d, "Morón", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(), "lavalle", 987);
        inm.setAvailableDays(Collections.emptyList());
        inmuebleService.create(inm, emptyImages);


        int pageSize = 1;

        Filtro filtroPagina1 = new Filtro(
                "",
                "í",
                null,
                null,
                PageRequest.of(0, pageSize)
        );
        Inmueble inmueble = inmuebleService.findByFiltro(filtroPagina1).toList().getFirst();

        assertEquals("ia", inmueble.getName());
        assertEquals("Morón", inmueble.getUbication());

    }

    @Test
    public void seBuscaNombreDeInmuebleSinTildesYTraeResultadosComoSiTuviera() throws EmailRepetido {
        userService.create(jorge);


        Inmueble inm = new Inmueble(
                "íííA", "Es un lugar espacioso", 200d, "Morón", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(), "lavalle", 987);
        inm.setAvailableDays(Collections.emptyList());
        inmuebleService.create(inm, emptyImages);


        int pageSize = 1;

        Filtro filtroPagina1 = new Filtro(
                "",
                "i",
                null,
                null,
                PageRequest.of(0, pageSize)
        );
        Inmueble inmueble = inmuebleService.findByFiltro(filtroPagina1).toList().getFirst();

        assertEquals("íííA", inmueble.getName());
        assertEquals("Morón", inmueble.getUbication());

    }

    @Test
    public void seBuscaInmuebleConUbicacionParcialYNoTraeResultados() throws EmailRepetido {
        userService.create(jorge);


        Inmueble inm = new Inmueble(
                "Quincho", "Es un lugar espacioso", 200d, "Morón", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(), "lavalle", 987);
        inm.setAvailableDays(Collections.emptyList());
        inmuebleService.create(inm, emptyImages);


        int pageSize = 1;

        Filtro filtroPagina1 = new Filtro(
                "m",
                "q",
                null,
                null,
                PageRequest.of(0, pageSize)
        );
        Page<Inmueble> pagina1 = inmuebleService.findByFiltro(filtroPagina1);

        assertTrue(pagina1.getContent().isEmpty());

    }

    @Test
    public void seBuscaInmuebleConUbicacionExactamenteIgualYTraeResultados() throws EmailRepetido {
        userService.create(jorge);


        Inmueble inm = new Inmueble(
                "Quincho", "Es un lugar espacioso", 200d, "Morón", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(), "lavalle", 987);
        inm.setAvailableDays(Collections.emptyList());
        inmuebleService.create(inm, emptyImages);


        int pageSize = 1;

        Filtro filtroPagina1 = new Filtro(
                "Morón",
                "q",
                null,
                null,
                PageRequest.of(0, pageSize)
        );
        Page<Inmueble> pagina1 = inmuebleService.findByFiltro(filtroPagina1);

        assertFalse(pagina1.getContent().isEmpty());

    }

    @Test
    public void seBuscaInmuebleConPrecioDentroDelRangoYTraeResultados() throws EmailRepetido {
        userService.create(jorge);


        Inmueble inm = new Inmueble(
                "Quincho", "Es un lugar espacioso", 200d, "Morón", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(), "lavalle", 987);
        inm.setAvailableDays(Collections.emptyList());
        inmuebleService.create(inm, emptyImages);


        int pageSize = 1;

        Filtro filtroPagina1 = new Filtro(
                "",
                "",
                100,
                500,
                PageRequest.of(0, pageSize)
        );
        Page<Inmueble> pagina1 = inmuebleService.findByFiltro(filtroPagina1);

        assertFalse(pagina1.getContent().isEmpty());

    }

    @Test
    public void seBuscaInmuebleConPrecioJustoDentroDelRangoMinYTraeResultados() throws EmailRepetido {
        userService.create(jorge);


        Inmueble inm = new Inmueble(
                "Quincho", "Es un lugar espacioso", 100d, "Morón", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(), "lavalle", 987);
        inm.setAvailableDays(Collections.emptyList());
        inmuebleService.create(inm, emptyImages);


        int pageSize = 1;

        Filtro filtroPagina1 = new Filtro(
                "",
                "",
                100,
                500,
                PageRequest.of(0, pageSize)
        );
        Page<Inmueble> pagina1 = inmuebleService.findByFiltro(filtroPagina1);

        assertFalse(pagina1.getContent().isEmpty());

    }

    @Test
    public void seBuscaInmuebleConPrecioJustoDentroDelRangoMaxYTraeResultados() throws EmailRepetido {
        userService.create(jorge);


        Inmueble inm = new Inmueble(
                "Quincho", "Es un lugar espacioso", 500d, "Morón", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(), "lavalle", 987);
        inm.setAvailableDays(Collections.emptyList());
        inmuebleService.create(inm, emptyImages);


        int pageSize = 1;

        Filtro filtroPagina1 = new Filtro(
                "",
                "",
                100,
                500,
                PageRequest.of(0, pageSize)
        );
        Page<Inmueble> pagina1 = inmuebleService.findByFiltro(filtroPagina1);

        assertFalse(pagina1.getContent().isEmpty());

    }

    @Test
    public void seBuscaInmuebleConPrecioFueraDelRangoMinYNoTraeResultados() throws EmailRepetido {
        userService.create(jorge);


        Inmueble inm = new Inmueble(
                "Quincho", "Es un lugar espacioso", 500d, "Morón", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(), "lavalle", 987);
        inm.setAvailableDays(Collections.emptyList());
        inmuebleService.create(inm, emptyImages);


        int pageSize = 1;

        Filtro filtroPagina1 = new Filtro(
                "",
                "",
                100,
                200,
                PageRequest.of(0, pageSize)
        );
        Page<Inmueble> pagina1 = inmuebleService.findByFiltro(filtroPagina1);

        assertTrue(pagina1.getContent().isEmpty());

    }

    @Test
    public void seBuscaInmuebleConPrecioFueraDelRangoMaxYNoTraeResultados() throws EmailRepetido {
        userService.create(jorge);


        Inmueble inm = new Inmueble(
                "Quincho", "Es un lugar espacioso", 500d, "Morón", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30), jorge, new SinDevolucion(), "lavalle", 987);
        inm.setAvailableDays(Collections.emptyList());
        inmuebleService.create(inm, emptyImages);


        int pageSize = 1;

        Filtro filtroPagina1 = new Filtro(
                "",
                "",
                700,
                900,
                PageRequest.of(0, pageSize)
        );
        Page<Inmueble> pagina1 = inmuebleService.findByFiltro(filtroPagina1);

        assertTrue(pagina1.getContent().isEmpty());

    }


    @AfterEach
    void limpiarDb(){
        testService.eliminarPeticiones();
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();
    }

}
