package com.reservo.controller;

import com.reservo.controller.dto.CredentialsDTO;
import com.reservo.controller.dto.UsuarioRequestDTO;
import com.reservo.controller.dto.UsuarioResponseDTO;
import com.reservo.controller.exception.ParametroIncorrecto;
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

//    @GetMapping("/{id}")
//    public ResponseEntity<UsuarioResponseDTO> getUsuarioById(@PathVariable Long id) {
//        if (this.usuarioService.findById(id).isEmpty()) return ResponseEntity.status(404).body(null);
//        Usuario user = this.usuarioService.findById(id).get();
//        return ResponseEntity.ok(UsuarioResponseDTO.desdeModelo(user));
//    }

    @GetMapping("/login/")
    public ResponseEntity<CredentialsDTO> getUsuarioById(@RequestParam String email, @RequestParam String pass) throws CredencialesIncorrectas {

        Credentials userCredentials = new Credentials(email, pass);

        CredentialsDTO loginCredentials = usuarioService.login(userCredentials); // TODO chequear nombre de credentials
        if (loginCredentials == null) return ResponseEntity.status(404).body(null); // TODO
//        Usuario user = this.usuarioService.findById(id).get();
        return ResponseEntity.ok(loginCredentials);
    }

    @GetMapping
    public ResponseEntity<Set<UsuarioResponseDTO>> getAllUsuarios() {
        return ResponseEntity.ok(this.usuarioService.findAll().stream()
                .map(UsuarioResponseDTO::desdeModelo)
                .collect(Collectors.toSet()));
    }

}

