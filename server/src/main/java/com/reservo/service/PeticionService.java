package com.reservo.service;

import com.reservo.controller.CancelacionDTO;
import com.reservo.modelo.reserva.Peticion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.reservo.controller.dto.Peticion.RechazoDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PeticionService {
    Peticion create(Peticion peticion);
    Optional<Peticion> findById(Long peticionId);
    List<Peticion> findAll();
    void update(Peticion peticion);
    void delete(Peticion peticion);
    List<Peticion> findAllVigentesByDateInInmueble(Long inmuebleId, LocalDate date);
    void reject(RechazoDTO  rechazoDTO);
    void approve(Long id);
    void cancel(CancelacionDTO cancelacionDTO);
    Page<Peticion> findAllPendientByOwnerId(Long id, Pageable pageable);
    Page<Peticion> findAllApproveByOwnerId(Long id, Pageable pageable);
    Page<Peticion> findAllRejectByOwnerId(Long id, Pageable pageable);

    Page<Peticion> findAllReservasPendientesByUserId(Long userId, Pageable page);

    Page<Peticion> findAllReservasVigentesByUserId(Long userId, Pageable page);

    Page<Peticion> findAllReservasCanceladasByUserId(Long id, Pageable page);
}
