package com.reservo.persistencia.DAO.user;

import com.reservo.modelo.user.AuthInfo;
import com.reservo.modelo.user.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthInfoDAO extends JpaRepository<AuthInfo, String> {

    @Query("select ai from AuthInfo ai where ai.user.id = :unUserId")
    Optional<AuthInfo> getInfoDeUsuario(@Param("unUserId") Long id);
}
