package com.reservo.service.impl;

import com.reservo.modelo.Peticion;
import com.reservo.persistencia.DAO.PeticionDAO;
import com.reservo.service.PeticionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PeticionServiceImpl implements PeticionService {

    private final PeticionDAO peticionDAO;

    public PeticionServiceImpl(PeticionDAO peticionDAO) {
        this.peticionDAO = peticionDAO;
    }

    @Override
    public Peticion create(Peticion peticion) {
        return peticionDAO.save(peticion);
    }

    @Override
    public Optional<Peticion> findById(Long peticionId) {
        return peticionDAO.findById(peticionId);
    }


    @Override
    public List<Peticion> findAll() {return peticionDAO.findAll();}

    @Override
    public void update(Peticion peticion) {peticionDAO.save(peticion);}

    @Override
    public void delete(Peticion peticion) {peticionDAO.delete(peticion);}
}
