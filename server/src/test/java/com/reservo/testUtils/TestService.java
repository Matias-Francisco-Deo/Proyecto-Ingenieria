package com.reservo.testUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class TestService {

    @PersistenceContext
    private EntityManager entityManager;

    public void eliminarUsuarios() {
        entityManager.createNativeQuery("DELETE FROM usuario").executeUpdate();
    }

    public void eliminarInmuebles() {
        entityManager.createNativeQuery("DELETE FROM inmueble").executeUpdate();
    }
}