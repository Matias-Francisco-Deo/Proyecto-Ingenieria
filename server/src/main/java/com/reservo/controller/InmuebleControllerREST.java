package com.reservo.controller;

import com.reservo.controller.dto.InmuebleRequestDTO;
import com.reservo.controller.dto.InmuebleResponseDTO;
import com.reservo.controller.dto.InmuebleSummaryDTO;
import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.InmuebleService;
import com.reservo.service.UsuarioService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/property")
public final class InmuebleControllerREST {
    private final InmuebleService inmuebleService;
    private final UsuarioService usuarioService;

    public InmuebleControllerREST(InmuebleService inmuebleService, UsuarioService usuarioService) {
        this.inmuebleService = inmuebleService;
        this.usuarioService = usuarioService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<InmuebleResponseDTO> createInmueble(
            @RequestPart("property") InmuebleRequestDTO inmuebleDTO,
            @RequestPart("images") List<MultipartFile> images
    ) throws ParametroIncorrecto {

        Usuario user = usuarioService.findById(inmuebleDTO.userId())
                .orElseThrow(() -> new ParametroIncorrecto("Usuario no encontrado"));

        Inmueble inmueble = inmuebleDTO.aModelo(user);

        Inmueble saved = inmuebleService.create(inmueble,images);

        return ResponseEntity.status(HttpStatus.CREATED).body(InmuebleResponseDTO.desdeModelo(saved));
    }

    @GetMapping
    public ResponseEntity<Set<InmuebleResponseDTO>> getAllUbicaciones() {
        return ResponseEntity.ok(this.inmuebleService.findAll().stream()
                .map(InmuebleResponseDTO::desdeModelo)
                .collect(Collectors.toSet()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InmuebleResponseDTO> getInmuebleById(@PathVariable Long id) {
        if(this.inmuebleService.findById(id).isEmpty()) return ResponseEntity.status(404).body(null);
        Inmueble inmueble = this.inmuebleService.findById(id).get();
        return ResponseEntity.ok(InmuebleResponseDTO.desdeModelo(inmueble));
    }

    @GetMapping("/buscar/{name}")
    public ResponseEntity<List<InmuebleSummaryDTO>> getInmuebleByName(
            @PathVariable String name,
            @RequestParam(defaultValue = "0") int page
    ) {

        Page<Inmueble> findByName = this.inmuebleService.findByName(name, PageRequest.of(page, 10));

        if(findByName.isEmpty()) return ResponseEntity.status(404).body(null);

        List<InmuebleSummaryDTO> inmuebles = findByName.stream()
                .map(InmuebleSummaryDTO::desdeModelo)
                .collect(Collectors.toList());

        return ResponseEntity.ok(inmuebles);
    }
}