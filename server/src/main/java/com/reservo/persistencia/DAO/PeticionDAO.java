package com.reservo.persistencia.DAO;

import com.reservo.modelo.Peticion;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.user.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PeticionDAO extends JpaRepository<Peticion, Long> {

    @Query("FROM Peticion p WHERE TYPE(p.estado) = Vigente AND p.inmueble.id = :inmuebleId AND p.fechaDelEvento = :fecha")
    List<Peticion> findPeticionesVigentes(@Param("inmuebleId") Long inmuebleId,
                                          @Param("fecha")LocalDate fecha
    );

    @Query("FROM Peticion p WHERE TYPE(p.estado) IN (Vigente, Pendiente) " +
            "AND p.cliente = :cliente AND p.inmueble = :inmueble AND p.fechaDelEvento = :fecha")
    Optional<Peticion> findByUsuarioAndInmueble(@Param("cliente") Usuario cliente,
                                                @Param("inmueble") Inmueble inmueble,
                                                @Param("fecha")LocalDate fecha);

    @Query("FROM Peticion p WHERE TYPE(p.estado) = Vigente AND p.inmueble.id = :inmuebleId AND p.fechaDelEvento = :date")
    List<Peticion> findAllVigentesByDateInInmueble(Long inmuebleId, LocalDate date);

    @Query("FROM Peticion p WHERE TYPE(p.estado) = Pendiente AND p.inmueble.owner.id = :unId ORDER BY p.fechaDelEvento asc")
    Page<Peticion> findAllByOwnerId(@Param("unId") Long userId, Pageable pageable);
}
