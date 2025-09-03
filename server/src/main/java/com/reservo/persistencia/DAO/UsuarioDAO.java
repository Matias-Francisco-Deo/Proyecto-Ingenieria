package com.reservo.persistencia.DAO;


import com.reservo.modelo.user.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioDAO extends JpaRepository<Usuario, Long> {

}
