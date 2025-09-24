package com.reservo.controller;

import com.reservo.controller.dto.Reservas.ReservaPendienteDTO;
import com.reservo.modelo.reserva.Peticion;
import com.reservo.service.PeticionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/mis-reservas")
public class ReservaControllerREST {
    private final PeticionService peticionService;

    public ReservaControllerREST(PeticionService peticionService) {
        this.peticionService = peticionService;
    }

    @GetMapping("/mis-reservas/pendientes/{id}")
    public ResponseEntity<Page<ReservaPendienteDTO>> findAllReservasPendientesByUserId
            (@PathVariable Long id,
             @RequestParam(defaultValue = "0") int page){
        Page<Peticion> reservaPage = peticionService.findAllReservasPendientesByUserId(id, PageRequest.of(page, 10));

        if(reservaPage.isEmpty()) return ResponseEntity.status(404).body(null);

        Page<ReservaPendienteDTO> reservas = reservaPage.map(ReservaPendienteDTO::desdeModelo);

        return ResponseEntity.ok(reservas);
    }
}
