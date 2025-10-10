package com.reservo.controller;

import com.reservo.controller.dto.Inmueble.InmuebleResponseDTO;
import com.reservo.controller.dto.Usuario.CredentialsDTO;
import com.reservo.controller.dto.Usuario.LoginRequestDTO;
import com.reservo.controller.dto.Usuario.UsuarioRequestDTO;
import com.reservo.controller.dto.Usuario.UsuarioResponseDTO;
import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.user.Credentials;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.UsuarioService;
import com.reservo.service.exception.CredencialesIncorrectas;
import com.reservo.service.exception.EmailRepetido;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
public final class UsuarioControllerREST {
    private final UsuarioService usuarioService;

    public UsuarioControllerREST(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<UsuarioResponseDTO> createUsuario(@RequestBody UsuarioRequestDTO usuarioRequestDTO) throws ParametroIncorrecto, EmailRepetido {
        Usuario user = this.usuarioService.create(usuarioRequestDTO.aModelo());
        return ResponseEntity.status(HttpStatus.CREATED).body(UsuarioResponseDTO.desdeModelo(user));
    }

    @PostMapping("/login/")
    public ResponseEntity<CredentialsDTO> loginById(@RequestBody LoginRequestDTO loginRequestDTO) throws CredencialesIncorrectas {

        Credentials userCredentials = new Credentials(loginRequestDTO.email(), loginRequestDTO.password());

        CredentialsDTO loginCredentials = usuarioService.login(userCredentials);
        if (loginCredentials == null) return ResponseEntity.status(404).body(null);
        return ResponseEntity.ok(loginCredentials);
    }

    @GetMapping
    public ResponseEntity<Set<UsuarioResponseDTO>> getAllUsuarios() {
        return ResponseEntity.ok(this.usuarioService.findAll().stream()
                .map(UsuarioResponseDTO::desdeModelo)
                .collect(Collectors.toSet()));
    }

    @GetMapping("/datos-usuario/{id}")
    public ResponseEntity<UsuarioResponseDTO> getUsuarioById(@PathVariable Long id) {
        if(this.usuarioService.findById(id).isEmpty()) return ResponseEntity.status(404).body(null);
        Usuario usuario = this.usuarioService.findById(id).get();
        return ResponseEntity.ok(UsuarioResponseDTO.desdeModelo(usuario));
    }

}

