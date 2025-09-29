package com.reservo.persistencia.DAO;

import com.reservo.modelo.Filtro;
import com.reservo.modelo.property.Inmueble;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InmuebleDAO extends JpaRepository<Inmueble, Long> {
    @Query("select count(i) > 0 from Inmueble i where i.id = :unId")
    boolean existeInmueble(@Param("unId") Long unId);//no es necesario validar id

    @Query("FROM Inmueble i WHERE LOWER(i.name) LIKE CONCAT(LOWER(:unName), '%')")
    Page<Inmueble> findByNameContainingIgnoreCase(String unName, Pageable pageable);

    @Query("FROM Inmueble i WHERE LOWER(i.name) LIKE CONCAT(LOWER(:unName), '%') AND i.ubication = :unaLocalidad")
    Page<Inmueble> findByNameAndLocalidad(@Param("unName") String nombre,@Param("unaLocalidad") String localidad, Pageable pageable);

    @Query("FROM Inmueble i " +
            "WHERE LOWER(i.name) LIKE CONCAT(LOWER(:#{#f.nombre}), '%') " +
            "AND LOWER(i.ubication) LIKE CONCAT(LOWER(:#{#f.localidad}), '%')")
    Page<Inmueble> findByFiltro(@Param("f") Filtro filtro, Pageable pageable);
}
