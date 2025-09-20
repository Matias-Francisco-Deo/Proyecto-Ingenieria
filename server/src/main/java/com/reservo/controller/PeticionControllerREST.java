package com.reservo.controller;

import com.reservo.controller.dto.Peticion.*;
import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.reserva.Peticion;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.InmuebleService;
import com.reservo.service.PeticionService;
import com.reservo.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/peticion")
public class PeticionControllerREST {
    private final PeticionService peticionService;
    private final UsuarioService usuarioService;
    private final InmuebleService inmuebleService;

    public PeticionControllerREST(PeticionService peticionService,UsuarioService usuarioService,InmuebleService inmuebleService) {
        this.peticionService = peticionService;
        this.usuarioService = usuarioService;
        this.inmuebleService = inmuebleService;
    }

    @PostMapping("/enviar")
    public ResponseEntity<PeticionResponseDTO> createPeticion(@RequestBody PeticionRequestDTO peticionDTO) throws ParametroIncorrecto {//TODO cambiar error, solo es temporal

        Usuario user = usuarioService.findById(peticionDTO.userId())
                .orElseThrow(() -> new ParametroIncorrecto("Usuario no encontrado"));

        Inmueble inmueble = inmuebleService.findById(peticionDTO.inmuebleId())
                .orElseThrow(() -> new ParametroIncorrecto("Inmueble no encontrado"));
        Peticion peticion = peticionDTO.aModelo(inmueble,user);

        Peticion saved = peticionService.create(peticion);
        return ResponseEntity.status(HttpStatus.CREATED).body(PeticionResponseDTO.desdeModelo(saved));
    }

    @GetMapping("/vigentes/{inmuebleId}/{date}")
    public ResponseEntity<List<HorarioPeticionDTO>> findAllVigentesByDateInInmueble(@PathVariable Long inmuebleId, @PathVariable LocalDate date){

        List<Peticion> peticiones = peticionService.findAllVigentesByDateInInmueble(inmuebleId, date);
        List<HorarioPeticionDTO> horarios = peticiones.stream().map(HorarioPeticionDTO::desdeModelo).toList();

        return ResponseEntity.ok(horarios);
    }

    @GetMapping("/pendiente/{id}")
    public ResponseEntity<PeticionPendienteResponseDTO> getPeticionById(@PathVariable Long id) {
        Optional<Peticion> peticion = this.peticionService.findById(id);

        if (peticion.isEmpty()) return ResponseEntity.status(404).body(null);

        return ResponseEntity.ok(PeticionPendienteResponseDTO.desdeModelo(peticion.get()));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<RechazoDTO> rechazarPeticion(@RequestBody RechazoDTO rechazoDTO) {
        this.peticionService.reject(rechazoDTO);

        return ResponseEntity.ok(rechazoDTO);
    }
}