package com.reservo.persistencia.DAO;

import com.reservo.modelo.reserva.Peticion;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.user.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
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

    // Peticiones (de distintos tipos) que le hicieron al dueño de un inmueble
    @Query("FROM Peticion p WHERE TYPE(p.estado) = Pendiente AND p.inmueble.owner.id = :unId ORDER BY p.fechaDelEvento asc")
    Page<Peticion> findAllPendientByOwnerId(@Param("unId") Long userId, Pageable pageable);

    @Query("FROM Peticion p WHERE TYPE(p.estado) = Vigente AND p.inmueble.owner.id = :unId ORDER BY p.fechaDelEvento asc")
    Page<Peticion> findAllApproveByOwnerId(@Param("unId") Long userId, Pageable pageable);

    @Query("FROM Peticion p WHERE TYPE(p.estado) = Cancelado AND p.inmueble.owner.id = :unId ORDER BY p.fechaDelEvento asc")
    Page<Peticion> findAllRejectByOwnerId(@Param("unId") Long userId, Pageable pageable);

    // verificaciones
    @Query("select count(p) > 0 from Peticion p where p.inmueble.owner.id = :ownerId and p.id = :petitionId")
    boolean isPetitionOfOwner(@Param("petitionId") Long petitionId, @Param("ownerId") Long ownerId);

    @Query("select count(p) > 0 from Peticion p where p.id = :petitionId and  (p.fechaDelEvento < :date or (p.fechaDelEvento = :date and p.horaInicio < :horaActual))")
    boolean itsDeprecatedFromDateAndTime(@Param("petitionId") Long petitionId, @Param("date") LocalDate date, @Param("horaActual") LocalTime horaActual);

    @Query("select count(p) > 0 from Peticion p where p.inmueble.id = :inmuebleId and TYPE(p.estado) = Vigente and p.fechaDelEvento = :fecha and (p.horaInicio < :horaFin and p.horaFin > :horaInicio)" )
    boolean wasAcceptedInSameTimeRange(@Param("inmuebleId") Long id,@Param("fecha") LocalDate fecha, @Param("horaInicio") LocalTime horaInicio, @Param("horaFin") LocalTime horaFin);

    @Query("select p from Peticion p where p.id = :peticionId and TYPE(p.estado) = Vigente" )
    Optional<Peticion> findVigenteById(@Param("peticionId") Long peticionId);

    @Query("select p from Peticion p where p.id = :peticionId and TYPE(p.estado) = Cancelado " )
    Optional<Peticion> findRejectedById(@Param("peticionId") Long peticionId);

    @Query("select p from Peticion p where p.id = :peticionId and TYPE(p.estado) = Pendiente" )
    Optional<Peticion> findPendienteById(@Param("peticionId") Long peticionId);

    @Query("FROM Peticion p WHERE p.cliente_id = :userId AND TYPE(p.estado) = Pendiente")
    Page<Peticion> findAllReservasPendientes(@Param("userId") Long userId, Pageable page);
}
