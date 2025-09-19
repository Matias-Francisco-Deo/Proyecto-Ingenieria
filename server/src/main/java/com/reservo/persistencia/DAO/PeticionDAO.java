package com.reservo.persistencia.DAO;

import com.reservo.modelo.reserva.Peticion;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.user.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface PeticionDAO extends JpaRepository<Peticion, Long> {

    @Query("FROM Peticion p WHERE TYPE(p.estado) = Vigente AND p.inmueble.id = :inmuebleId AND p.fecha = :fecha")
    List<Peticion> findPeticionesVigentes(@Param("inmuebleId") Long inmuebleId,
                                          @Param("fecha")LocalDate fecha
    );

    @Query("FROM Peticion p WHERE TYPE(p.estado) IN (Vigente, Pendiente) " +
            "AND p.cliente = :cliente AND p.inmueble = :inmueble AND p.fecha = :fecha")
    Optional<Peticion> findByUsuarioAndInmueble(@Param("cliente") Usuario cliente,
                                                @Param("inmueble") Inmueble inmueble,
                                                @Param("fecha")LocalDate fecha);

    @Query("FROM Peticion p WHERE TYPE(p.estado) = Vigente AND p.inmueble.id = :inmuebleId AND p.fecha = :date")
    List<Peticion> findAllVigentesByDateInInmueble(Long inmuebleId, LocalDate date);

    @Query("select count(p) > 0 from Peticion p where p.inmueble.owner.id = :ownerId and p.id = :petitionId")
    boolean isPetitionOfOwner(@Param("petitionId") Long petitionId, @Param("ownerId") Long ownerId);
}
