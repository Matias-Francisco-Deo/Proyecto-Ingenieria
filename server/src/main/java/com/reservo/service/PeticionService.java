package com.reservo.service;

import com.reservo.modelo.Peticion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
    Page<Peticion> findAllByOwnerId(Long id, Pageable pageable);
}
