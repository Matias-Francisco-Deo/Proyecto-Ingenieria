package com.reservo.service;

import com.reservo.modelo.Filtro;
import com.reservo.modelo.property.Inmueble;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface InmuebleService {
    Inmueble create(Inmueble inmueble,List<MultipartFile> images);
    Inmueble update(Inmueble inmueble);
    Inmueble delete(Inmueble inmueble);
    Optional<Inmueble> findById(Long inmuebleId);
    List<Inmueble> findAll();
    Page<Inmueble> findByName(String name, Pageable pageable);

    Page<Inmueble> findByFiltro(Filtro filtro);
}
