package com.reservo.service.exception.user;

public class UsuarioNoExiste extends RuntimeException {
    public UsuarioNoExiste(String message) {
        super(message);
    }
}
