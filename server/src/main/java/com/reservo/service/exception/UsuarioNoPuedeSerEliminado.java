package com.reservo.service.exception;

public class UsuarioNoPuedeSerEliminado extends RuntimeException {
    public UsuarioNoPuedeSerEliminado(String message) {
        super(message);
    }
}
