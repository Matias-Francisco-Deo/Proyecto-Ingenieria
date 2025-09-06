package com.reservo.service;

import com.reservo.controller.dto.CredentialsRequestDTO;
import com.reservo.modelo.user.Credentials;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.exception.EmailRepetido;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    Usuario create(Usuario usuario) throws EmailRepetido;
    Optional<Usuario> findById(Long userId);
    List<Usuario> findAll();
    void update(Usuario usuario);
    void delete(Usuario usuario);
    CredentialsRequestDTO login(Credentials credentials);
}
