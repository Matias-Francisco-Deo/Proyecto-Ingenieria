package com.reservo.service.impl;

import com.reservo.controller.dto.Usuario.CredentialsDTO;
import com.reservo.modelo.user.Credentials;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.UsuarioService;
import com.reservo.service.exception.CredencialesIncorrectas;
import com.reservo.service.exception.EmailRepetido;
import com.reservo.testUtils.TestService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
@SpringBootTest
public class UsuarioServiceImplTests {

    @Autowired
    private TestService testService;

    @Autowired
    private UsuarioService usuarioService;
    Usuario jorge;
    Usuario juanito;

    @BeforeEach
    void crearInstancias() {
        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        juanito = new Usuario("juanito", "bb22", "juanito@yahoo.com.ar");
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



    @AfterEach
    void limpiarDb(){
        testService.eliminarPeticiones();
        testService.eliminarInmuebles();
        testService.eliminarUsuarios();;
    }
}
