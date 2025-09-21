package com.reservo.service.impl;

import com.reservo.modelo.Peticion;
import com.reservo.modelo.managers.TimeManager;
import com.reservo.persistencia.DAO.PeticionDAO;
import com.reservo.service.PeticionService;
import com.reservo.service.exception.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class PeticionServiceImpl implements PeticionService {

    private final PeticionDAO peticionDAO;
    private final TimeManager timeManager;

    public PeticionServiceImpl(PeticionDAO peticionDAO, TimeManager timeManager) {
        this.timeManager = timeManager;
        this.peticionDAO = peticionDAO;
    }

    @Override
    public Peticion create(Peticion peticion) {
        verificarDisponibilidad(peticion);
        verificarSiEsDuenioDeLaPropiedad(peticion);
        verificarSiOrdenDeHorarioDeLaPeticion(peticion);
        verificarSeDentroDelRango(peticion);
        verificarSiYaSeRealizoLaPeticion(peticion);
        verificarSiEsUnViajeroDelTiempo(peticion);
        return peticionDAO.save(peticion);
    }

    private void verificarSiEsDuenioDeLaPropiedad(Peticion peticion) {
        if (esDuenio(peticion)) throw new EsDueñoDeLaPropiedadSolicitada();
    }

    private boolean esDuenio(Peticion peticion) {
        return Objects.equals(peticion.getCliente().getId(), peticion.getInmueble().getOwner().getId());
    }

    private void verificarSiEsUnViajeroDelTiempo(Peticion peticion) {
        if (!timeManager.esActual(peticion)) throw new VieneDelPasado();
    }

    private void verificarSiYaSeRealizoLaPeticion(Peticion peticion) {
        if (existeUnaPeticionHecha(peticion)) throw new RealizoUnaPeticionSobreElInmuebleEnElMismoDia();
    }

    private boolean existeUnaPeticionHecha(Peticion peticion) {
        return peticionDAO.findByUsuarioAndInmueble(peticion.getCliente(), peticion.getInmueble(), peticion.getFechaDelEvento()).isPresent();
    }

    //BORRAR SI SE AGREGAN RESERVA DE DOS DIAS
    private void verificarSiOrdenDeHorarioDeLaPeticion(Peticion peticion) {
        if (!timeManager.estanOrdenadosLosHorarios(peticion)) throw new HorarioDesordenado();
    }

    private void verificarSeDentroDelRango(Peticion peticion) {
        if (!timeManager.estaDentroDelRango(peticion)) throw new RangoDeHorarioSuperado();
    }


    private void verificarDisponibilidad(Peticion peticion) {
        if(timeManager.elRangoEstaOcupadoPorAlgunaPeticion(peticion, peticionDAO)) throw new HorariosSuperpuestos();
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

    @Override
    public List<Peticion> findAllVigentesByDateInInmueble(Long inmuebleId, LocalDate date) {
        return peticionDAO.findAllVigentesByDateInInmueble(inmuebleId, date);
    }

    @Override
    public Page<Peticion> findAllByOwnerId(Long userId, Pageable pageable) {
        return peticionDAO.findAllByOwnerId(userId, pageable);
    }
}
