package com.reservo.service;

import com.reservo.modelo.property.Inmueble;

import java.util.List;
import java.util.Optional;

public interface InmuebleService {
    Inmueble create(Inmueble inmueble);
    Inmueble update(Inmueble inmueble);
    Inmueble delete(Inmueble inmueble);
    Optional<Inmueble> findById(Long inmuebleId);
    List<Inmueble> findAll();
    List<Inmueble> findByName(String name);
}
