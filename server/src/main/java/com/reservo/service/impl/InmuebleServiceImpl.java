package com.reservo.service.impl;

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

    private final InmuebleDAO dao;

    public InmuebleServiceImpl(InmuebleDAO dao) {
        this.dao = dao;
    }

    @Override
    public Inmueble create(Inmueble inmueble,List<MultipartFile> images) {

        List<String> imagePaths = saveImages(images);
        inmueble.getImages().addAll(imagePaths);

        if (dao.existeInmueble(inmueble.getId())) throw new InmuebleRepetidoException("El inmueble ya está registrado.");
        return dao.save(inmueble);
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
        return dao.findById(inmuebleId);
    }

    @Override
    public List<Inmueble> findAll() {
        return dao.findAll();
    }

    @Override
    public Page<Inmueble> findByName(String name, Pageable pageable) {
        return dao.findByNameContainingIgnoreCase(name, pageable);
    }

    private List<String> saveImages(List<MultipartFile> images) {
        List<String> paths = new ArrayList<>();
        Path uploadDir = Paths.get("uploads");

        try {

            Files.createDirectories(uploadDir);// Crear la carpeta si no existe

            for (MultipartFile file : images) {
                String originalFilename = file.getOriginalFilename();
                //if (originalFilename == null || originalFilename.isBlank()) continue;

                String filename = UUID.randomUUID() + "_" + originalFilename;
                Path filePath = uploadDir.resolve(filename);


                Files.copy(file.getInputStream(), filePath);// Guardar archivo

                paths.add(filename);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar las imágenes");
        }

        return paths;
    }
}
