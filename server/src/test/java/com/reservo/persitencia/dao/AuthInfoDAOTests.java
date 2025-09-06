package com.reservo.persitencia.dao;

import com.reservo.modelo.user.AuthInfo;
import com.reservo.modelo.user.Usuario;
import com.reservo.persistencia.DAO.user.AuthInfoDAO;
import com.reservo.persistencia.DAO.user.UsuarioDAO;
import com.reservo.testUtils.TestService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AuthInfoDAOTests {

    @Autowired
    private TestService testService;

    @Autowired
    private UsuarioDAO usuarioDAO;

    @Autowired
    private AuthInfoDAO authInfoDAO;

    Usuario jorge;
    Usuario juanito;

    @BeforeEach
    void crearInstancias() {
        jorge = new Usuario("jorge", "aa21", "jorge@yahoo.com.ar");
        juanito = new Usuario("juanito", "bb22", "juanito@yahoo.com.ar");
        usuarioDAO.save(jorge);
    }

    @Test
    void seCarganLosDatosDeAutenticacionYTieneUnaKey() {
        Usuario jorgeFromDb = usuarioDAO.findById(jorge.getId()).get();
        AuthInfo authInfo = new AuthInfo(UUID.randomUUID().toString(), jorgeFromDb);
        authInfoDAO.save(authInfo);

        Optional<AuthInfo> authInfoFromDb = authInfoDAO.findById(authInfo.getId());

        assertFalse(authInfoFromDb.get().getKey().isEmpty());

    }





    @AfterEach
    void limpiarDb(){

        testService.eliminarUsuarios();
    }
}
