package com.reservo.controller;

import com.reservo.controller.dto.*;
import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.Peticion;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.InmuebleService;
import com.reservo.service.PeticionService;
import com.reservo.service.UsuarioService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

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

    @GetMapping("/{id}")
    public ResponseEntity<PeticionResponseDTO> findPeticionById(@PathVariable Long id){
        if (this.peticionService.findById(id).isEmpty()) return ResponseEntity.status(404).body(null);
        Peticion peticion = peticionService.findById(id).get();
        return ResponseEntity.ok(PeticionResponseDTO.desdeModelo(peticion));
    }

    @GetMapping("/owner/{id}")
    public ResponseEntity<Page<PeticionSummaryDTO>> findAllByOwnerId(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page
    ) {
        Page<Peticion> findById = this.peticionService.findAllByOwnerId(id, PageRequest.of(page, 10));

        if (findById.isEmpty()) return ResponseEntity.status(404).body(null);

        Page<PeticionSummaryDTO> peticiones = findById.map(PeticionSummaryDTO::desdeModelo);

        return ResponseEntity.ok(peticiones);
    }
}
