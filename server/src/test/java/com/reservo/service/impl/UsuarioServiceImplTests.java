package com.reservo.service.impl;

import com.reservo.modelo.user.Usuario;
import com.reservo.service.UsuarioService;
import com.reservo.testUtils.TestService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

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
        jorge = new Usuario("jorge", "aa21");
        juanito = new Usuario("juanito", "bb22");
    }

    @Test
    void alRecuperarUnIdInexistenteNoTraeNada(){
        Optional<Usuario> user = usuarioService.findById(-5L);

        assertFalse(user.isPresent());
    }

    @Test
    void seGuardaUnUserEnlaDB(){
        usuarioService.create(jorge);
        Optional<Usuario> user = usuarioService.findById(jorge.getId());

        assertTrue(user.isPresent());
    }

    @Test
    void sePersistenLosDatosDeUnUser(){
        usuarioService.create(jorge);
        Optional<Usuario> userDeDb = usuarioService.findById(jorge.getId());

        assertEquals("jorge", userDeDb.get().getName());
        assertEquals("aa21", userDeDb.get().getPassword());
    }

    @Test
    void sePersistenVariosUsers(){
        usuarioService.create(jorge);
        usuarioService.create(juanito);

        List<Usuario> usersDeDb = usuarioService.findAll();

        assertEquals(2, usersDeDb.size());
    }

    @AfterEach
    void limpiarDb(){
        testService.eliminarUsuarios();
    }
}
