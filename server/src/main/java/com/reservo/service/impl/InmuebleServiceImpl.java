package com.reservo.service.impl;

import com.reservo.modelo.property.Inmueble;
import com.reservo.persistencia.DAO.InmuebleDAO;
import com.reservo.service.InmuebleService;
import com.reservo.service.exception.InmuebleRepetidoException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class InmuebleServiceImpl implements InmuebleService {

    private final InmuebleDAO dao;

    public InmuebleServiceImpl(InmuebleDAO dao) {
        this.dao = dao;
    }

    @Override
    public Inmueble create(Inmueble inmueble) {
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
    public List<Inmueble> findByName(String name) {
        return dao.findByNameContainingIgnoreCase(name);
    }
}
