package com.reservo.persistencia.DAO;

import com.reservo.modelo.Peticion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeticionDAO extends JpaRepository<Peticion, Long> {
}
