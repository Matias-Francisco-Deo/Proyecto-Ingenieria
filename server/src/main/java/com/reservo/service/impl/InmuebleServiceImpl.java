package com.reservo.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.reservo.controller.dto.Inmueble.InmuebleModifyRequestDTO;
import com.reservo.controller.dto.Inmueble.InmuebleRemoveImagesDTO;
import com.reservo.controller.exception.ParametroIncorrecto;
import com.reservo.modelo.Filtro;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.ReservoImage;
import com.reservo.persistencia.DAO.inmueble.ImageDAO;
import com.reservo.persistencia.DAO.PeticionDAO;
import com.reservo.persistencia.DAO.inmueble.InmuebleDAO;
import com.reservo.service.InmuebleService;
import com.reservo.service.exception.InmuebleRepetidoException;
import com.reservo.service.exception.NoExisteInmuebleExpcetion;
import com.reservo.service.exception.TienePeticionVigenteException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@Transactional
public class InmuebleServiceImpl implements InmuebleService {

    private final InmuebleDAO inmuebleDAO;
    private final ImageDAO imageDAO;
    private final Cloudinary cloudinary;
    private final PeticionDAO peticionDAO;

    public InmuebleServiceImpl(InmuebleDAO dao, ImageDAO imageDAO, Cloudinary cloudinary, PeticionDAO peticionDAO) {
        this.inmuebleDAO = dao;
        this.imageDAO = imageDAO;
        this.cloudinary = cloudinary;
        this.peticionDAO = peticionDAO;
    }

    @Override
    public Inmueble create(Inmueble inmueble,List<MultipartFile> images) {

        List<ReservoImage> imagePaths = saveImages(images);
        inmueble.getImages().addAll(imagePaths);

        if (inmuebleDAO.existeInmueble(inmueble.getId())) throw new InmuebleRepetidoException("El inmueble ya está registrado.");
        return inmuebleDAO.save(inmueble);
    }

    @Override
    public void delete(Long inmuebleId) {
        if (!inmuebleDAO.existeInmueble(inmuebleId))
            throw new NoExisteInmuebleExpcetion("No existe la publicación que quiere eliminar");

        if (inmuebleDAO.tienePeticionesVigentes(inmuebleId))
            throw new TienePeticionVigenteException("El inmueble tiene peticiones vigentes todavía");

        peticionDAO.deleteByInmueble(inmuebleId);
        inmuebleDAO.deleteById(inmuebleId);
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
    public Page<Inmueble> findByFiltro(Filtro filtro) {
        return inmuebleDAO.findByFiltros(filtro.getNombre(),
                filtro.getLocalidad(),
                filtro.getPrecioMin(),
                filtro.getPrecioMax(),
                filtro.getHorarioMin(),
                filtro.getHorarioMax(),
                filtro.getCapacidad(),
                filtro.getPage());
    }

    @Override
    public Page<Inmueble> getAllByOwnerId(Long id, Pageable pageable) {
        return inmuebleDAO.getAllByOwnerId(id, pageable);
    }



    @Override
    public void update(Long inmuebleId, InmuebleModifyRequestDTO inmuebleDTO) throws ParametroIncorrecto {
        if (!inmuebleDAO.existeInmueble(inmuebleId))
            throw new NoExisteInmuebleExpcetion("No existe la publicación que quiere modificar");

        Inmueble inmueble = inmuebleDAO.findById(inmuebleId).orElseThrow(() -> new ParametroIncorrecto("El inmueble no existe."));
        Inmueble inmuebleModificado = inmuebleDTO.aModeloModificado(inmueble);

        inmuebleDAO.save(inmuebleModificado);
    }

    @Override
    public void addImages(Long inmuebleId, List<MultipartFile> images) throws ParametroIncorrecto {
        if (!inmuebleDAO.existeInmueble(inmuebleId))
            throw new NoExisteInmuebleExpcetion("Ya no existe el inmueble al que se quiere acceder");

        if (images.isEmpty()) return;

        Inmueble inmueble = inmuebleDAO.findById(inmuebleId).orElseThrow(() -> new ParametroIncorrecto("El inmueble no existe."));
        List<ReservoImage> imagePaths = saveImages(images);
        inmueble.getImages().addAll(imagePaths);

        inmuebleDAO.save(inmueble);

    }

    @Override
    public void removeImages(Long inmuebleId, InmuebleRemoveImagesDTO images) throws ParametroIncorrecto {
        if (!inmuebleDAO.existeInmueble(inmuebleId))
            throw new NoExisteInmuebleExpcetion("Ya no existe el inmueble al que se quiere acceder");


        List<Integer> imagesToRemove = images.imagesToRemove();
        if (images.imagesToRemove().isEmpty()) return;

        Inmueble inmueble = inmuebleDAO.findById(inmuebleId).orElseThrow(() -> new ParametroIncorrecto("El inmueble no existe."));

        List<ReservoImage> dbImagesToDelete = new ArrayList<>();
        for (Integer index : imagesToRemove) {
            ReservoImage reservoImage = inmueble.getImages().get(index);
            dbImagesToDelete.add(reservoImage);
        }

        removeImages(dbImagesToDelete);
        for (ReservoImage reservoImage : dbImagesToDelete) {
            inmueble.getImages().remove(reservoImage);
        }

        inmuebleDAO.save(inmueble);
    }

    private List<ReservoImage> saveImages(List<MultipartFile> images) {
        List<ReservoImage> reservoImages = new ArrayList<>();
        try {
            for (MultipartFile file : images) {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                        ObjectUtils.asMap());
                ReservoImage image = new ReservoImage((String) uploadResult.get("public_id"),(String) uploadResult.get("secure_url"));
                imageDAO.save(image);
                reservoImages.add(image);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar las imágenes");
        }

//        List<String> paths = new ArrayList<>();
//        Path uploadDir = Paths.get("uploads");
//
//        try {
//
//            Files.createDirectories(uploadDir);// Crear la carpeta si no existe
//
//            for (MultipartFile file : images) {
//                String originalFilename = file.getOriginalFilename();
//
//                String filename = UUID.randomUUID() + "_" + originalFilename;
//                Path filePath = uploadDir.resolve(filename);
//
//                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);// Guardar archivo
//
//                paths.add(filename);
//            }
//        } catch (IOException e) {
//            throw new RuntimeException("Error al guardar las imágenes");
//        }
//
        return reservoImages;
    }

    private void removeImages(List<ReservoImage> images) {
//        Path uploadDir = Paths.get("uploads");
//
//        try {
//
//            for (String pathString : images) {
//
//                String pathToImage = uploadDir + "/" + pathString;
//
//                Files.delete(Path.of(pathToImage));
//
//            }
//        } catch (IOException e) {
//            throw new RuntimeException("Error al eliminar las imágenes");
//        }
        try {
            for (ReservoImage image : images) {
                cloudinary.uploader().destroy(
                        image.getPublicId(),
                        ObjectUtils.asMap("resource_type", "image")
                );


            }
        } catch (IOException e) {
            throw new RuntimeException("Error al eliminar las imágenes");
        }
    }
}
