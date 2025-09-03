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

//    public void eliminarEspiritus() {
//        entityManager.createNativeQuery("DELETE FROM espiritu").executeUpdate();
//    }
//
//    public void eliminarUbicaciones() {
//        entityManager.createNativeQuery("DELETE FROM ubicacion").executeUpdate();
//    }
//
//    public void eliminarMediums() {
//        entityManager.createNativeQuery("DELETE FROM medium").executeUpdate();
//    }
}