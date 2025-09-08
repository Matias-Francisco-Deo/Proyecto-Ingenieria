package com.reservo.service.impl;

import com.reservo.controller.dto.CredentialsDTO;
import com.reservo.modelo.user.AuthInfo;
import com.reservo.modelo.user.Credentials;
import com.reservo.modelo.user.Usuario;
import com.reservo.persistencia.DAO.user.AuthInfoDAO;
import com.reservo.persistencia.DAO.user.UsuarioDAO;
import com.reservo.service.UsuarioService;
import com.reservo.service.exception.CredencialesIncorrectas;
import com.reservo.service.exception.EmailRepetido;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioDAO usuarioDAO;
    private final AuthInfoDAO authInfoDAO;

    public UsuarioServiceImpl(UsuarioDAO usuarioDAO, AuthInfoDAO authInfoDAO) {
        this.usuarioDAO = usuarioDAO;
        this.authInfoDAO = authInfoDAO;
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

    @Override
    public CredentialsDTO login(Credentials credentials) throws CredencialesIncorrectas {
        Usuario user = usuarioDAO.getUsuarioConCredenciales(credentials.email(), credentials.password()).orElseThrow(() -> new CredencialesIncorrectas("Las credenciales dadas son erróneas."));

        removePreviousKey(user);

        String username = user.getName();

        AuthInfo authInfo = authInfoDAO.save(new AuthInfo(user)); // guardo la key

        return (new CredentialsDTO(authInfo.getId(), username));
    }

    private void removePreviousKey(Usuario user) {
        Optional<AuthInfo> infoDeUsuario = authInfoDAO.getInfoDeUsuario(user.getId());
        infoDeUsuario.ifPresent(authInfoDAO::delete);
        authInfoDAO.flush(); // ESTE FLUSH es importante, sino sigue en la misma transacción y quiere borrar LUEGO de haber puesto la nueva entrada. Lo cual rompe todo.
    }
}
