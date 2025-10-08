package com.reservo.testUtils;

import com.reservo.controller.dto.Peticion.RechazoDTO;
import com.reservo.modelo.property.*;
import com.reservo.modelo.reserva.Peticion;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.InmuebleService;
import com.reservo.service.PeticionService;
import com.reservo.service.UsuarioService;
import com.reservo.service.exception.EmailRepetido;
import com.reservo.service.impl.InmuebleServiceImpl;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
public class ReservoSetUp {

    @Autowired
    private TestService testService;

    @Autowired
    private UsuarioService usuarioService;
    Usuario jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
    Usuario juanito = new Usuario("juanito", "bb22", "juanito@yahoo.com.ar");
    Usuario pepe = new Usuario("pepe", "cc33", "pepe@gmail.com");
    List<DiasDeLaSemana> availableDays = List.of(DiasDeLaSemana.LUNES, DiasDeLaSemana.MIERCOLES, DiasDeLaSemana.SABADO);

    Inmueble inmueble1 = new Inmueble(
            "Plaza", "Es una plaza linda", 200d,"Berazategui", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30), availableDays, new Flexible(), List.of("plaza2.jpg"), jorge,"lavalle",987);

    Inmueble inmueble2 = new Inmueble(
                "Quincho", "Es un lugar espacioso", 200d,"Quilmes", 100, "No romper nada",
                LocalTime.of(12, 30), LocalTime.of(14, 30),  availableDays, new Flexible(), List.of("quincho.webp", "quincho-para-reuniones.jpg"), juanito,"pelegrini",123);
    Inmueble inmueble3 = new Inmueble(
            "Jardín Onírico", "Es un jardín", 200d,"Avellaneda", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30),  availableDays, new Flexible(), List.of("jardín.jpeg"),jorge,"Rivadavia",300);

    Inmueble inmueble4 = new Inmueble(
            "Lo de Juanito", "Es un lugar espacioso", 200d,"Quilmes", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30), availableDays, new Flexible(), List.of("quincho-para-reuniones.jpg"),juanito, "pelegrini",123);
    Inmueble inmueble5 = new Inmueble(
            "Lo de Jorge", "Cálido y cómodo.", 200d,"Berazategui", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30), availableDays, new Flexible(), List.of("quincho-para-reuniones.jpg"),jorge, "lavalle",987);

    Inmueble inmueble6 = new Inmueble(
            "Casa de té", "Es un lugar con mucho té", 200d,"Quilmes", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30), availableDays, new Flexible(), List.of("café2.jpg"),juanito, "Balcarce",100);
    Inmueble inmueble7 = new Inmueble(
            "Pizzería Espacial", "Es alta pizzería, mucho espacio y alta calidad", 200d,"Berazategui", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30), availableDays, new Flexible(), List.of("pizza.jpg"),jorge, "lavalle",987);

    Inmueble inmueble8 = new Inmueble(
            "Cafetería del mar", "Amo los caracoles, y acá puse todos los que tengo", 200d,"Varela", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30), availableDays, new Flexible(), List.of("café3.jpg"),juanito, "San Martín",100);
    Inmueble inmueble9 = new Inmueble(
            "Montaña privada del este", "Perfecto para acampados", 200d,"Varela", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30), availableDays, new Flexible(), List.of("quincho-para-reuniones.jpg"),jorge, "Lavalle",100);

    Inmueble inmueble10 = new Inmueble(
            "Karaoke party", "Tenemos parlantes muy grandes", 200d,"Bernal", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30), availableDays, new Flexible(), List.of("karaoke.webp"),juanito, "Dean Funes",10);

    Inmueble inmueble11 = new Inmueble(
            "Quincho para fiestas de 15", "Muchos árboles y un escenario grande", 200d,"Quilmes", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30), availableDays, new Flexible(), List.of("quincho.webp"),juanito, "pelegrini",123);
    Inmueble inmueble12 = new Inmueble(
            "Bar Los Perdidos", "Tenemos equipo de música", 200d,"Avellaneda", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30), availableDays, new Flexible(), List.of("café3.jpg"),juanito, "Mitre",1500);
    Inmueble inmueble13 = new Inmueble(
            "Bar los piratas", "Espadas de verdad!", 200d,"Quilmes", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30), availableDays, new Flexible(), List.of("café3.jpg"),juanito, "pelegrini",123);
    Inmueble inmueble14 = new Inmueble(
            "Cafetería Los alpes", "tenemos café", 200d,"Varela", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30), availableDays, new Flexible(), List.of("café4.jpg"),juanito, "pelegrini",123);
    Inmueble inmueble15 = new Inmueble(
            "Boliche Buroro", "Bola de disco, muchas luces.", 200d,"Quilmes", 100, "No romper nada",
            LocalTime.of(12, 30), LocalTime.of(14, 30),availableDays, new Flexible(), List.of("boliche.jpg", "boliche2.webp", "boliche3.png"), juanito, "pelegrini",123);

    List<Inmueble> inmuebles = List.of(inmueble1, inmueble2, inmueble3, inmueble4, inmueble5, inmueble6, inmueble7, inmueble8, inmueble9,
            inmueble10, inmueble11, inmueble12, inmueble13, inmueble14, inmueble15 );

    @Autowired
    private InmuebleService inmuebleService;

    @Autowired
    private PeticionService peticionService;

    @Test
    @Disabled("Ejecutar como setup para reviews / testing a nivel integración")
    void setup() throws EmailRepetido {
        usuarioService.create(jorge);
        usuarioService.create(juanito);
        usuarioService.create(pepe);

        for (Inmueble inmueble : inmuebles) {
            inmuebleService.create(inmueble, List.of());
        }

        List<Peticion> peticiones = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            peticiones.add(peticionService.create(getPeticionNueva(pepe, inmuebles.get(i),0)));
        }


        for (int i = 0; i < 8; i++) {
            peticionService.create(getPeticionNueva(jorge, inmueble4, i));
        }

        peticionService.approve(peticiones.getFirst().getId());

        Long ownerId = peticiones.getLast().getInmueble().getOwner().getId();
        peticionService.reject(new RechazoDTO(ownerId, peticiones.getLast().getId(), "No me agrada") );

        Long ownerId5 = peticiones.get(5).getInmueble().getOwner().getId();
        peticionService.reject(new RechazoDTO(ownerId5, peticiones.get(5).getId(), "Se me complicó") );

    }

    private Peticion getPeticionNueva(Usuario user, Inmueble inmueble, int masDias) {
        return new Peticion(user, inmueble, LocalDate.now().plusDays(1 + masDias), LocalTime.of(12, 30), LocalTime.of(13, 30), 100D);
    }

//    @AfterEach
    //@Test
    //@Disabled("Ejecutar con cuidado, borra TODO")
    void teardown() {
        testService.eliminarPeticiones();
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();
    }


}

