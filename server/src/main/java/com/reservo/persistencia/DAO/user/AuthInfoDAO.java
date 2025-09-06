package com.reservo.persistencia.DAO.user;

import com.reservo.modelo.user.AuthInfo;
import com.reservo.modelo.user.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthInfoDAO extends JpaRepository<AuthInfo, Long> {
}
