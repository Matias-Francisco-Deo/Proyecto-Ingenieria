package com.reservo.service.impl;

import com.reservo.controller.dto.Inmueble.InmuebleModifyRequestDTO;
import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.Filtro;
import com.reservo.modelo.property.Inmueble;
import com.reservo.persistencia.DAO.InmuebleDAO;
import com.reservo.service.InmuebleService;
import com.reservo.service.exception.InmuebleRepetidoException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class InmuebleServiceImpl implements InmuebleService {

    private final InmuebleDAO inmuebleDAO;

    public InmuebleServiceImpl(InmuebleDAO dao) {
        this.inmuebleDAO = dao;
    }

    @Override
    public Inmueble create(Inmueble inmueble,List<MultipartFile> images) {

        List<String> imagePaths = saveImages(images);
        inmueble.getImages().addAll(imagePaths);

        if (inmuebleDAO.existeInmueble(inmueble.getId())) throw new InmuebleRepetidoException("El inmueble ya está registrado.");
        return inmuebleDAO.save(inmueble);
    }

    @Override
    public Inmueble update(Inmueble inmueble) {
        return null;
    }

    @Override
    public Inmueble delete(Inmueble inmueble) {
        return null;
    }

    @Override
    public Optional<Inmueble> findById(Long inmuebleId) {
        return inmuebleDAO.findById(inmuebleId);
    }

    @Override
    public List<Inmueble> findAll() {
        return inmuebleDAO.findAll();
    }

    @Override
    public Page<Inmueble> findByName(String name, Pageable pageable) {
        return inmuebleDAO.findByNameContainingIgnoreCase(name, pageable);
    }

    @Override
    public Page<Inmueble> findByFiltro(Filtro filtro) {
        return inmuebleDAO.findByFiltro(filtro, filtro.getPage());
    }

    @Override
    public Page<Inmueble> getAllByOwnerId(Long id, Pageable pageable) {
        return inmuebleDAO.getAllByOwnerId(id, pageable);
    }

    @Override
    public void modify(Long inmuebleId, InmuebleModifyRequestDTO inmuebleDTO) throws ParametroIncorrecto {
        Inmueble inmueble = inmuebleDAO.findById(inmuebleId).orElseThrow(() -> new ParametroIncorrecto("El inmueble no existe."));
        Inmueble inmuebleModificado = inmuebleDTO.aModeloModificado(inmueble);
    }

    private List<String> saveImages(List<MultipartFile> images) {
        List<String> paths = new ArrayList<>();
        Path uploadDir = Paths.get("uploads");

        try {

            Files.createDirectories(uploadDir);// Crear la carpeta si no existe

            for (MultipartFile file : images) {
                String originalFilename = file.getOriginalFilename();

                String filename = UUID.randomUUID() + "_" + originalFilename;
                Path filePath = uploadDir.resolve(filename);


                Files.copy(file.getInputStream(), filePath,StandardCopyOption.REPLACE_EXISTING);// Guardar archivo

                paths.add(filename);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar las imágenes");
        }

        return paths;
    }
}
