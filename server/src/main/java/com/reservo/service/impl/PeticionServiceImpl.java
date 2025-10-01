package com.reservo.service.impl;

import com.reservo.controller.CancelacionDTO;
import com.reservo.controller.dto.Peticion.RechazoDTO;
import com.reservo.modelo.peticion.EmailMessages;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.reserva.estadosReservas.Cancelado;
import com.reservo.modelo.reserva.estadosReservas.Pendiente;
import com.reservo.modelo.reserva.estadosReservas.Vigente;
import com.reservo.service.EmailService;
import com.reservo.service.exception.peticion.*;
import com.reservo.modelo.reserva.Peticion;
import com.reservo.modelo.managers.TimeManager;
import com.reservo.persistencia.DAO.PeticionDAO;
import com.reservo.service.PeticionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class PeticionServiceImpl implements PeticionService {

    private final PeticionDAO peticionDAO;
    private final TimeManager timeManager;
    private final EmailService emailService;

    public PeticionServiceImpl(PeticionDAO peticionDAO, TimeManager timeManager, EmailService emailService) {
        this.timeManager = timeManager;
        this.peticionDAO = peticionDAO;
        this.emailService = emailService;
    }

    @Override
    public Peticion create(Peticion peticion) {
        verificarDisponibilidad(peticion);
        verificarSiYaSeRealizoLaPeticion(peticion);
        verificarSiEsDuenioDeLaPropiedad(peticion);
        verificarSiOrdenDeHorarioDeLaPeticion(peticion);
        verificarSeDentroDelRango(peticion);
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
    public void reject(RechazoDTO rechazoDTO) {
        if (peticionDAO.findVigenteById(rechazoDTO.peticionId()).isPresent()) throw new PeticionYaVigente("La petición ya está vigente.");
        if (peticionDAO.itsDeprecatedFromDateAndTime(rechazoDTO.peticionId(), LocalDate.now(), LocalTime.now())) throw new PeticionVencida("La petición esta vencida.");
        if (!peticionDAO.isPetitionOfOwner(rechazoDTO.peticionId(), rechazoDTO.ownerId())) return;

        Peticion peticion = peticionDAO.findPendienteById(rechazoDTO.peticionId()).get(); // no debería tirar error porque el check de arriba hace return si no existe también

        peticion.rechazar(rechazoDTO.motivoDeRechazo());
        peticionDAO.save(peticion);
        sendRejectMessageToClient(peticion);
    }

    @Override
    public void cancel(CancelacionDTO cancelcaionDTO){
        Optional<Peticion> optionalPeticion = peticionDAO.findById(cancelcaionDTO.peticionId());

        if (optionalPeticion.isEmpty()) return;
        if (peticionDAO.itsDeprecatedFromDateAndTime(cancelcaionDTO.peticionId(), LocalDate.now(), LocalTime.now())) throw new PeticionVencida("La petición esta vencida.");
        if (peticionDAO.findRejectedById(cancelcaionDTO.peticionId()).isPresent()) throw new PeticionYaVigente("La petición ya fue cancelada.");

        Peticion peticion = optionalPeticion.get();

        peticion.cancelar(cancelcaionDTO.motivoDeCancelacion());

        peticionDAO.save(peticion);
        sendCancelMessageToClient(peticion);

    }

    @Override
    public void approve(Long peticionId) {
        Optional<Peticion> optionalPeticion = peticionDAO.findPendienteById(peticionId);
        if (optionalPeticion.isEmpty()) return;

        Peticion peticion = optionalPeticion.get();
        if (peticionDAO.itsDeprecatedFromDateAndTime(peticionId, LocalDate.now(), LocalTime.now())) throw new PeticionVencida("La petición esta vencida.");
        Long inmuebleId = peticion.getInmueble().getId();
        if (peticionDAO.wasAcceptedInSameTimeRange(inmuebleId, peticion.getFechaDelEvento(), peticion.getHoraInicio(), peticion.getHoraFin())) throw new HorarioOcupado("El horario ya esta ocupado por otra petición.");

        peticion.aprobar();
        peticionDAO.save(peticion);
        sendApproveMessageToClient(peticion);

    }

    private void sendApproveMessageToClient(Peticion peticion) {
        String propertyDataText = "Le informamos desde Reservo que su petición al inmueble %s, en la localidad de %s, dirección %s %s, ha sido aceptada por el dueño en el horario de";
        String dateText = "%s - %s para el día %s.";
        sendMessageToClient(peticion, propertyDataText, dateText);
    }

    private void sendRejectMessageToClient(Peticion peticion) {
        String rejectionSpan = EmailMessages.getOrangeHTMLSpan("\"" + peticion.getMotivoCancelacionRechazo() + "\"");
        String rejectPartOfMessage = (!peticion.getMotivoCancelacionRechazo().isBlank()) ? " bajo el motivo: %s.".formatted(rejectionSpan) : ".";

        String propertyDataText ="Le informamos desde Reservo que su petición al inmueble %s, en la localidad de %s, dirección %s %s,";
        String dateText = "en el horario de %s - %s para el día %s, ha sido rechazada por el dueño" + rejectPartOfMessage;

        sendMessageToClient(peticion, propertyDataText, dateText);
    }

    private void sendCancelMessageToClient(Peticion peticion) {
        String propertyDataText ="Le informamos desde Reservo que su petición al inmueble %s, en la localidad de %s, dirección %s %s,";
        String dateText = "en el horario de %s - %s para el día %s, ha sido cancelada correctamente.";

        sendMessageToClient(peticion, propertyDataText, dateText);
    }

    private void sendMessageToClient(Peticion peticion, String propertyDataText, String dateText) {
        String clientEmail = peticion.getCliente().getEmail();
        String subject = "Petición a propiedad";

        Inmueble inmueble = peticion.getInmueble();
        String propertyName = EmailMessages.getOrangeHTMLSpan(inmueble.getName());

        String ubication = EmailMessages.getOrangeHTMLSpan(inmueble.getUbication());
        String calle = EmailMessages.getOrangeHTMLSpan(inmueble.getCalle());
        String altura = EmailMessages.getOrangeHTMLSpan(String.valueOf(inmueble.getAltura()));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        String horaInicio =  EmailMessages.getOrangeHTMLSpan(formatter.format(peticion.getHoraInicio()));
        String horaFin = EmailMessages.getOrangeHTMLSpan(formatter.format(peticion.getHoraFin()));

        String fechaDelEvento = EmailMessages.getOrangeHTMLSpan(String.valueOf(peticion.getFechaDelEvento()));

        String htmlContent = EmailMessages.getHTML(
                propertyDataText.formatted(propertyName, ubication, calle, altura),
                dateText.formatted(horaInicio, horaFin, fechaDelEvento));

        new Thread(() -> emailService.sendHTMLEmail(clientEmail, subject, htmlContent)).start();
    }


    @Override
    public Page<Peticion> findAllPendientByOwnerId(Long userId, Pageable pageable) {
        return peticionDAO.findAllPendientByOwnerId(userId, pageable);
    }

    @Override
    public Page<Peticion> findAllApproveByOwnerId(Long userId, Pageable pageable) {
        return peticionDAO.findAllApproveByOwnerId(userId, pageable);
    }

    @Override
    public Page<Peticion> findAllRejectByOwnerId(Long userId, Pageable pageable) {
        return peticionDAO.findAllRejectByOwnerId(userId, pageable);
    }

    @Override
    public Page<Peticion> findAllReservasPendientesByUserId(Long userId, Pageable page) {
        return peticionDAO.findAllReservasByEstado(userId, page, Pendiente.class);
    }

    @Override
    public Page<Peticion> findAllReservasVigentesByUserId(Long userId, Pageable page) {
        return peticionDAO.findAllReservasByEstado(userId, page, Vigente.class);
    }

    @Override
    public Page<Peticion> findAllReservasCanceladasByUserId(Long userId, Pageable page) {
        return peticionDAO.findAllReservasByEstado(userId, page, Cancelado.class);
    }
}
