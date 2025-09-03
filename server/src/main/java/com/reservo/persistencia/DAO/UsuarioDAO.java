package com.reservo.persistencia.DAO;


import com.reservo.modelo.user.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioDAO extends JpaRepository<Usuario, Long> {

    @Query("select count(u) > 0 from Usuario u where u.email = :unEmail and (u.id != :unId or :unId is null)")
    boolean existeEmail(@Param("unEmail") String email, @Param("unId") Long unId);
}
