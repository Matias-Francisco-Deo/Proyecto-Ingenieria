package com.reservo.service;

import com.reservo.controller.dto.Inmueble.InmuebleModifyRequestDTO;
import com.reservo.controller.dto.Inmueble.InmuebleRemoveImagesDTO;
import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.Filtro;
import com.reservo.modelo.property.Inmueble;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface InmuebleService {
    Inmueble create(Inmueble inmueble,List<MultipartFile> images);
    void update(Long inmuebleId, InmuebleModifyRequestDTO inmuebleDTO) throws ParametroIncorrecto;
    void addImages(Long inmuebleId, List<MultipartFile> images) throws ParametroIncorrecto;
    Inmueble delete(Inmueble inmueble);
    Optional<Inmueble> findById(Long inmuebleId);
    List<Inmueble> findAll();
    Page<Inmueble> findByName(String name, Pageable pageable);

    Page<Inmueble> findByFiltro(Filtro filtro);
    Page<Inmueble> getAllByOwnerId(Long id, Pageable pageable);

    void removeImages(Long id, InmuebleRemoveImagesDTO images) throws ParametroIncorrecto;
}
