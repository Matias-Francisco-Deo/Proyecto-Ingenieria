package com.reservo.service.impl;

import com.reservo.controller.dto.Usuario.CredentialsDTO;
import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.user.AuthInfo;
import com.reservo.modelo.user.Credentials;
import com.reservo.modelo.user.Usuario;
import com.reservo.persistencia.DAO.user.AuthInfoDAO;
import com.reservo.persistencia.DAO.user.UsuarioDAO;
import com.reservo.service.UsuarioService;
import com.reservo.service.exception.CredencialesIncorrectas;
import com.reservo.service.exception.EmailRepetido;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    @Override//configurado para reemplazar sin condiciones en los datos que no son id
    public void update(Usuario usuario) {
        if (usuario.getId() == null) throw new IllegalArgumentException("El usuario debe tener un ID para poder actualizarse.");

        if (usuarioDAO.findById(usuario.getId()).isEmpty())
            throw new EntityNotFoundException("Usuario no encontrado");

        usuarioDAO.save(usuario);
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

        return (new CredentialsDTO(user.getId(),authInfo.getId(), username));
    }

    private void removePreviousKey(Usuario user) {
        Optional<AuthInfo> infoDeUsuario = authInfoDAO.getInfoDeUsuario(user.getId());
        infoDeUsuario.ifPresent(authInfoDAO::delete);
        authInfoDAO.flush(); // ESTE FLUSH es importante, sino sigue en la misma transacción y quiere borrar LUEGO de haber puesto la nueva entrada. Lo cual rompe todo.
    }
}
