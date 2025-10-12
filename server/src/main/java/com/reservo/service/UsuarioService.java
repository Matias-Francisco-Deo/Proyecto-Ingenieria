package com.reservo.service;

import com.reservo.controller.dto.Usuario.CredentialsDTO;
import com.reservo.modelo.user.Credentials;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.exception.CredencialesIncorrectas;
import com.reservo.service.exception.EmailRepetido;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    Usuario create(Usuario usuario) throws EmailRepetido;
    Optional<Usuario> findById(Long userId);
    List<Usuario> findAll();
    void update(Usuario usuario);
    void delete(Usuario usuario);
    CredentialsDTO login(Credentials credentials) throws CredencialesIncorrectas;
    void emailRepetido(String email, Long idActual) throws EmailRepetido;
}
