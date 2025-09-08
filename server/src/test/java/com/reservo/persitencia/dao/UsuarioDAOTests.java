package com.reservo.persitencia.dao;

import com.reservo.modelo.user.Usuario;
import com.reservo.persistencia.DAO.user.UsuarioDAO;
import com.reservo.testUtils.TestService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UsuarioDAOTests {

    @Autowired
    private TestService testService;

    @Autowired
    private UsuarioDAO usuarioDAO;

//    @Autowired
//    private UsuarioService usuarioService;
    Usuario jorge;
    Usuario juanito;

    @BeforeEach
    void crearInstancias() {
        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        juanito = new Usuario("juanito", "bb22", "juanito@yahoo.com.ar");
    }

    @Test
    void siSeCargoUnEmailEsteExisteEnLaDBParaOtroID() {
        usuarioDAO.save(jorge);
        assertTrue(usuarioDAO.existeEmail("jorge@yahoo.com.ar", 0L));
    }

    @Test
    void usuarioConCredencialesValidasDaLosDatos() {
        usuarioDAO.save(jorge);
        Optional<Usuario> user = usuarioDAO.getUsuarioConCredenciales("jorge@yahoo.com.ar", "aa21");
        assertEquals(user.get().getName(), jorge.getName());
    }

    @Test
    void usuarioConCredencialesInvalidasDevuelveVacio() {
        usuarioDAO.save(jorge);
        Optional<Usuario> user = usuarioDAO.getUsuarioConCredenciales("jorge@yahoo.com.ar", "contrasenia");
        assertTrue(user.isEmpty());
    }



    @AfterEach
    void limpiarDb(){
        testService.eliminarUsuarios();
    }
}
