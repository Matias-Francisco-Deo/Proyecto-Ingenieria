package com.reservo.controller;

import com.reservo.controller.dto.InmuebleRequestDTO;
import com.reservo.controller.dto.InmuebleResponseDTO;
import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.property.Inmueble;
import com.reservo.service.InmuebleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/property")
public final class InmuebleControllerREST {
    private final InmuebleService inmuebleService;

    public InmuebleControllerREST(InmuebleService inmuebleService) {
        this.inmuebleService = inmuebleService;
    }

    @PostMapping
    public ResponseEntity<InmuebleResponseDTO> createInmueble(@RequestBody InmuebleRequestDTO inmuebleRequestDTO) throws ParametroIncorrecto {
        Inmueble inmueble = this.inmuebleService.create(inmuebleRequestDTO.aModelo());
        return ResponseEntity.status(HttpStatus.CREATED).body(InmuebleResponseDTO.desdeModelo(inmueble));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InmuebleResponseDTO> getInmuebleById(@PathVariable Long id) {
        if(this.inmuebleService.findById(id).isEmpty()) return ResponseEntity.status(404).body(null);
        Inmueble inmueble = this.inmuebleService.findById(id).get();
        return ResponseEntity.ok(InmuebleResponseDTO.desdeModelo(inmueble));
    }

//    @GetMapping
//    public ResponseEntity<Set<InmuebleResponseDTO>> getAllUbicaciones() {
//        return ResponseEntity.ok(this.inmuebleService.findAll().stream()
//                .map(InmuebleResponseDTO::desdeModelo)
//                .collect(Collectors.toSet()));
//    }
}