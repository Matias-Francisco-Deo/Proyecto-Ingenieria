package com.reservo.controller.exception;

import com.reservo.service.exception.CredencialesIncorrectas;
import com.reservo.service.exception.EmailRepetido;
import com.reservo.service.exception.user.UsuarioNoExiste;
import com.reservo.service.exception.user.UsuarioNoPuedeSerEliminado;
import com.reservo.service.exception.peticion.HorarioOcupado;
import com.reservo.service.exception.peticion.PeticionVencida;
import com.reservo.service.impl.PeticionYaVigente;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ParametroIncorrecto.class)
    public DTOResponseError badParameterHandler(ParametroIncorrecto ex) {
        return new DTOResponseError(ex.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(EmailRepetido.class)
    public ResponseEntity<DTOResponseError> repeatedEmail(EmailRepetido ex) {
        return new ResponseEntity<>(new DTOResponseError(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CredencialesIncorrectas.class)
    public ResponseEntity<DTOResponseError> wrongCredentials(CredencialesIncorrectas ex) {
        return new ResponseEntity<>(new DTOResponseError(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(PeticionVencida.class)
    public ResponseEntity<DTOResponseError> deprecatedPetition(PeticionVencida ex) {
        return new ResponseEntity<>(new DTOResponseError(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HorarioOcupado.class)
    public ResponseEntity<DTOResponseError> horarioOcupado(HorarioOcupado ex) {
        return new ResponseEntity<>(new DTOResponseError(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(PeticionYaVigente.class)
    public ResponseEntity<DTOResponseError> peticionYaVigente(PeticionYaVigente ex) {
        return new ResponseEntity<>(new DTOResponseError(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UsuarioNoPuedeSerEliminado.class)
    public ResponseEntity<DTOResponseError> usuarioNoPuedeSerEliminado(UsuarioNoPuedeSerEliminado ex) {
        return new ResponseEntity<>(new DTOResponseError(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UsuarioNoExiste.class)
    public ResponseEntity<DTOResponseError> usuarioNoExiste(UsuarioNoExiste ex) {
        return new ResponseEntity<>(new DTOResponseError(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }



}
