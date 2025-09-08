package com.reservo.modelo.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UsuarioTests {
    Usuario jorge;

    @BeforeEach
    void setUp() {
        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
    }

    @Test
    void usuarioTieneNombre() {
        assertEquals("jorge", jorge.getName());
    }

    @Test
    void usuarioTienePassword() {
        assertEquals("aa21", jorge.getPassword());
    }

    @Test
    void usuarioTieneEmail() {
        assertEquals("jorge@yahoo.com.ar", jorge.getEmail());
    }
}
