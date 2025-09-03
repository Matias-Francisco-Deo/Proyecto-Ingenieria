package com.reservo.service.impl;

import com.reservo.modelo.user.Usuario;
import com.reservo.persistencia.DAO.UsuarioDAO;
import com.reservo.service.UsuarioService;
import com.reservo.service.exception.EmailRepetido;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioDAO usuarioDAO;

    public UsuarioServiceImpl(UsuarioDAO usuarioDAO) {
        this.usuarioDAO = usuarioDAO;
    }

    @Override
    public Usuario create(Usuario usuario) throws EmailRepetido {
        if (usuarioDAO.existeEmail(usuario.getEmail(), usuario.getId())) throw new EmailRepetido("El email ya se encuentra registrado.");
        return usuarioDAO.save(usuario);
    }

    @Override
    public Optional<Usuario> findById(Long userId) {
        return usuarioDAO.findById(userId);
    }

    @Override
    public List<Usuario> findAll() {
        return usuarioDAO.findAll();
    }

    @Override
    public void update(Usuario usuario) {

    }

    @Override
    public void delete(Usuario usuario) {

    }
}
