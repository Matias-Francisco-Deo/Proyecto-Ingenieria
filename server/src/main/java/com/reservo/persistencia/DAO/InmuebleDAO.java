package com.reservo.persistencia.DAO;

import com.reservo.modelo.property.Inmueble;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InmuebleDAO extends JpaRepository<Inmueble, Long> {
    @Query("select count(i) > 0 from Inmueble i where i.id = :unId")
    boolean existeInmueble(@Param("unId") Long unId);
}
