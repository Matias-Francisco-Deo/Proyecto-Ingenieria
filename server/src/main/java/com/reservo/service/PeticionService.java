package com.reservo.service;

import com.reservo.controller.dto.Peticion.RechazoDTO;
import com.reservo.modelo.reserva.Peticion;

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

    void reject(RechazoDTO rechazoDTO);
}
