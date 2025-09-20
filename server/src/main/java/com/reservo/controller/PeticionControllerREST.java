package com.reservo.controller;

import com.reservo.controller.dto.Peticion.AprobarDTO;
import com.reservo.controller.dto.Peticion.HorarioPeticionDTO;
import com.reservo.controller.dto.Peticion.PeticionRequestDTO;
import com.reservo.controller.dto.Peticion.PeticionResponseDTO;
import com.reservo.controller.dto.Peticion.RechazoDTO;
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

    @PatchMapping("/aprobar")
    public ResponseEntity.BodyBuilder approve(@RequestBody AprobarDTO aprobarDTO){

        peticionService.approve(aprobarDTO.peticionId());

        return ResponseEntity.ok();
    }

    @PatchMapping("/rechazar")
    public ResponseEntity.BodyBuilder reject(@RequestBody RechazoDTO rechazoDTO){

        peticionService.reject(rechazoDTO);

        return ResponseEntity.ok();
    }

}
