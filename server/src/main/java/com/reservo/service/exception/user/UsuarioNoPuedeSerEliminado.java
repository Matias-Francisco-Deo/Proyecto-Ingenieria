package com.reservo.service.exception.user;

public class UsuarioNoPuedeSerEliminado extends RuntimeException {
    public UsuarioNoPuedeSerEliminado(String message) {
        super(message);
    }
}
