package com.reservo.controller;

import com.reservo.controller.dto.Inmueble.BusquedaInmueblesDTO;
import com.reservo.controller.dto.Inmueble.InmuebleRequestDTO;
import com.reservo.controller.dto.Inmueble.InmuebleResponseDTO;
import com.reservo.controller.dto.Inmueble.InmuebleSummaryDTO;
import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.user.Usuario;
import com.reservo.service.InmuebleService;
import com.reservo.service.UsuarioService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/buscar")
    public ResponseEntity<Page<InmuebleSummaryDTO>> buscarInmuebles(
            @RequestBody BusquedaInmueblesDTO filtros
    ) {
        Page<Inmueble> findByNameAndLocalidad = this.inmuebleService.findByFiltro(filtros.aModelo());

        if (findByNameAndLocalidad.isEmpty()) {
            return ResponseEntity.status(404).body(null);
        }

        Page<InmuebleSummaryDTO> inmuebles = findByNameAndLocalidad.map(InmuebleSummaryDTO::desdeModelo);

        return ResponseEntity.ok(inmuebles);
    }
    @GetMapping("/{id}/images")
    public ResponseEntity<List<String>> getInmuebleImages(@PathVariable Long id) {
        return inmuebleService.findById(id)
                .map(inmueble -> {
                    List<String> imagePaths = inmueble.getImages()
                            .stream()
                            .map(filename -> "/uploads/" + filename)
                            .toList();
                    return ResponseEntity.ok(imagePaths);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping("/owner/{id}")
    public ResponseEntity<Page<InmuebleResponseDTO>> getAllPropertiesByIdOwner(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page
    ) {
        Page<Inmueble> allPropertiesByOwner = this.inmuebleService.getAllByOwnerId(id, PageRequest.of(page, 10));

        if (allPropertiesByOwner.isEmpty()) return ResponseEntity.status(404).body(null);

        Page<InmuebleResponseDTO> inmuebles = allPropertiesByOwner.map(InmuebleResponseDTO::desdeModelo);

        return ResponseEntity.ok(inmuebles);
    }
}