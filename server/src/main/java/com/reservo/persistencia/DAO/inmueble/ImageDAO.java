package com.reservo.persistencia.DAO.inmueble;

import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.ReservoImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageDAO extends JpaRepository<ReservoImage, Long> {
}
