package com.reservo.persistencia.DAO.inmueble;

import com.reservo.modelo.Filtro;
import com.reservo.modelo.property.Inmueble;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InmuebleDAO extends JpaRepository<Inmueble, Long> {
    @Query("select count(i) > 0 from Inmueble i where i.id = :unId")
    boolean existeInmueble(@Param("unId") Long unId);//no es necesario validar id

    @Query("FROM Inmueble i WHERE LOWER(i.name) LIKE CONCAT(LOWER(:unName), '%')")
    Page<Inmueble> findByNameContainingIgnoreCase(String unName, Pageable pageable);

//    @Query("FROM Inmueble i WHERE LOWER(i.name) LIKE CONCAT(LOWER(:unName), '%') AND i.ubication = :unaLocalidad")
//    Page<Inmueble> findByNameAndLocalidad(@Param("unName") String nombre,@Param("unaLocalidad") String localidad, Pageable pageable);


    @Query("FROM Inmueble i WHERE i.owner.id = :id")
    Page<Inmueble> getAllByOwnerId(@Param("id") Long id, Pageable pageable);

    String FIND_BY_NAME_QUERY_PART = "unaccent(LOWER(i.name)) LIKE unaccent(CONCAT(LOWER(CAST(:nombre AS text)), '%'))";

    String FIND_BY_LOCALIDAD_QUERY_PART = "(:localidad IS NULL OR :localidad = '' OR unaccent(LOWER(i.ubication)) = unaccent(LOWER(CAST(:localidad AS text))))";

    String FIND_BY_PRECIO_QUERY_PART = "(:precioMin IS NULL OR :precioMax IS NULL OR (i.price BETWEEN :precioMin AND :precioMax))";

    String FIND_BY_FILTRO_QUERY =
            "FROM inmueble i " +
                    "WHERE " + FIND_BY_NAME_QUERY_PART + " " +
                    "AND " + FIND_BY_LOCALIDAD_QUERY_PART + " " +
                    "AND " + FIND_BY_PRECIO_QUERY_PART;

    @Query(value = "SELECT * " + FIND_BY_FILTRO_QUERY, countQuery = "SELECT COUNT(*) " + FIND_BY_FILTRO_QUERY, nativeQuery = true)
    Page<Inmueble> findByFiltros(@Param("nombre") String nombre,
                                 @Param("localidad") String localidad,
                                 @Param("precioMin") Integer precioMin,
                                 @Param("precioMax") Integer precioMax,
                                 Pageable pageable);

    @Modifying
    @Query("DELETE FROM Inmueble i WHERE i.owner.id = :userId")
    void deleteByOwner(@Param("userId") Long userId);
}
