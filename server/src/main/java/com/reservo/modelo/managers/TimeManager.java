package com.reservo.modelo.managers;

import com.reservo.modelo.reserva.Peticion;
import com.reservo.persistencia.DAO.PeticionDAO;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Component
public class TimeManager {
    public boolean estaDentroDelRango(Peticion peticion) {
        LocalTime horaInicioInmueble = peticion.getInmueble().getHoraInicio();
        LocalTime horaInicioPeticion = peticion.getHoraInicio().plusMinutes(1);
        LocalTime horaFinInmueble = peticion.getInmueble().getHoraFin();
        LocalTime horaFinPeticion = peticion.getHoraFin().minusMinutes(1);
        return horaInicioInmueble.isBefore(horaInicioPeticion) && horaFinInmueble.isAfter(horaFinPeticion);
    }

    public boolean estanOrdenadosLosHorarios(Peticion peticion) {
        return peticion.getHoraFin().isAfter(peticion.getHoraInicio());
    }

    public boolean elRangoEstaOcupadoPorAlgunaPeticion(Peticion peticion, PeticionDAO peticionDAO) {
        List<Peticion> peticionesVigentes = peticionDAO.findPeticionesVigentes(peticion.getInmueble().getId(), peticion.getFechaDelEvento());

        return peticionesVigentes.stream().anyMatch(p -> estaOcupado(peticion, p));
    }

    public boolean estaOcupado(Peticion pSolicitada, Peticion pVigente) {
        LocalTime inicioVigente = pVigente.getHoraInicio();
        LocalTime finVigente = pVigente.getHoraFin();
        LocalTime inicioSolicitada = pSolicitada.getHoraInicio();
        LocalTime finSolicitada = pSolicitada.getHoraFin();

        // Dos rangos [inicio, fin] se solapan si:
        // el inicio de uno es antes del fin del otro Y viceversa
        return inicioSolicitada.isBefore(finVigente) && inicioVigente.isBefore(finSolicitada);
    }

    public boolean esActual(Peticion peticion) {
        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime inicioPeticion = LocalDateTime.of(peticion.getFechaDelEvento(), peticion.getHoraInicio());

        // Opcional: restar un minuto si querés incluir margen
        inicioPeticion = inicioPeticion.minusMinutes(1);

        return ahora.isBefore(inicioPeticion);
    }
}
