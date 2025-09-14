package com.reservo.modelo.managers;

import com.reservo.modelo.Peticion;
import com.reservo.modelo.property.Inmueble;
import com.reservo.persistencia.DAO.PeticionDAO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TimeManagerTest {

    @Mock
    private Peticion peticion;

    @Mock
    private Peticion peticionVigente;

    @Mock
    private Inmueble inmueble;

    @Mock
    private PeticionDAO peticionDAO;

    private TimeManager timeManager;

    @BeforeEach
    public void setUp(){
        timeManager = new TimeManager();
    }

    @Test
    public void laPeticionSeEncuentraDentroDelHorario(){
        when(peticion.getHoraInicio()).thenReturn(LocalTime.of(14,0,0));
        when(peticion.getHoraFin()).thenReturn(LocalTime.of(15,0,0));
        when(peticion.getInmueble()).thenReturn(inmueble);
        when(inmueble.getHoraInicio()).thenReturn(LocalTime.of(12,0,0));
        when(inmueble.getHoraFin()).thenReturn(LocalTime.of(17,0,0));

        assertTrue(timeManager.estaDentroDelRango(peticion));
    }

    @Test
    public void laPeticionSeEncuentraDentroDelHorarioSiendoIguales(){
        when(peticion.getHoraInicio()).thenReturn(LocalTime.of(12,0,0));
        when(peticion.getHoraFin()).thenReturn(LocalTime.of(17,0,0));
        when(peticion.getInmueble()).thenReturn(inmueble);
        when(inmueble.getHoraInicio()).thenReturn(LocalTime.of(12,0,0));
        when(inmueble.getHoraFin()).thenReturn(LocalTime.of(17,0,0));

        assertTrue(timeManager.estaDentroDelRango(peticion));
    }

    @Test
    public void laPeticionNoSeEncuentraDentroDelHorarioInicio(){
        when(peticion.getHoraInicio()).thenReturn(LocalTime.of(9,0,0));
        when(peticion.getHoraFin()).thenReturn(LocalTime.of(16,0,0));
        when(peticion.getInmueble()).thenReturn(inmueble);
        when(inmueble.getHoraInicio()).thenReturn(LocalTime.of(12,0,0));
        when(inmueble.getHoraFin()).thenReturn(LocalTime.of(17,0,0));

        assertFalse(timeManager.estaDentroDelRango(peticion));
    }

    @Test
    public void laPeticionNoSeEncuentraDentroDelHorarioFin(){
        when(peticion.getHoraInicio()).thenReturn(LocalTime.of(13,0,0));
        when(peticion.getHoraFin()).thenReturn(LocalTime.of(19,0,0));
        when(peticion.getInmueble()).thenReturn(inmueble);
        when(inmueble.getHoraInicio()).thenReturn(LocalTime.of(12,0,0));
        when(inmueble.getHoraFin()).thenReturn(LocalTime.of(17,0,0));

        assertFalse(timeManager.estaDentroDelRango(peticion));
    }

    @Test
    public void laPeticionTieneElHorarioOrdenado(){
        when(peticion.getHoraInicio()).thenReturn(LocalTime.of(13,0,0));
        when(peticion.getHoraFin()).thenReturn(LocalTime.of(19,0,0));

        assertTrue(timeManager.estanOrdenadosLosHorarios(peticion));
    }

    @Test
    public void laPeticionTieneElHorarioNoEstaOrdenado(){
        when(peticion.getHoraInicio()).thenReturn(LocalTime.of(23,0,0));
        when(peticion.getHoraFin()).thenReturn(LocalTime.of(19,0,0));

        assertFalse(timeManager.estanOrdenadosLosHorarios(peticion));
    }

    @Test
    public void laPeticionSolicitadaSeSolapaConLaPeticionVigentePorQueLaVigenteContieneElFinDeLaSolicitada(){
        when(peticion.getHoraInicio()).thenReturn(LocalTime.of(12,0,0));
        when(peticion.getHoraFin()).thenReturn(LocalTime.of(15,0,0));
        when(peticionVigente.getHoraInicio()).thenReturn(LocalTime.of(13,0,0));
        when(peticionVigente.getHoraFin()).thenReturn(LocalTime.of(16,0,0));

        assertTrue(timeManager.estaOcupado(peticion, peticionVigente));
    }

    @Test
    public void laPeticionSolicitadaSeSolapaConLaPeticionVigentePorQueLaVigenteContieneElInicioDeLaSolicitada(){
        when(peticion.getHoraInicio()).thenReturn(LocalTime.of(14,0,0));
        when(peticion.getHoraFin()).thenReturn(LocalTime.of(17,0,0));
        when(peticionVigente.getHoraInicio()).thenReturn(LocalTime.of(13,0,0));
        when(peticionVigente.getHoraFin()).thenReturn(LocalTime.of(16,0,0));

        assertTrue(timeManager.estaOcupado(peticion, peticionVigente));
    }


    @Test
    public void laPeticionSolicitadaSeSolapaConLaPeticionVigentePorQueLaVigenteContienePorCompletoALaSolicitada(){
        when(peticion.getHoraInicio()).thenReturn(LocalTime.of(12,0,0));
        when(peticion.getHoraFin()).thenReturn(LocalTime.of(15,0,0));
        when(peticionVigente.getHoraInicio()).thenReturn(LocalTime.of(10,0,0));
        when(peticionVigente.getHoraFin()).thenReturn(LocalTime.of(16,0,0));

        assertTrue(timeManager.estaOcupado(peticion, peticionVigente));
    }

    @Test
    public void laPeticionSolicitadaSeSolapaConLaPeticionVigentePorQueLaSolicitadaContieneALaVigente(){
        //SOLICITADO
        when(peticion.getHoraInicio()).thenReturn(LocalTime.of(9,0,0));
        when(peticion.getHoraFin()).thenReturn(LocalTime.of(15,0,0));
        //VIGENTE
        when(peticionVigente.getHoraInicio()).thenReturn(LocalTime.of(13,0,0));
        when(peticionVigente.getHoraFin()).thenReturn(LocalTime.of(14,0,0));

        assertTrue(timeManager.estaOcupado(peticion, peticionVigente));
    }
    @Test
    public void lasPeticionesNoSeSuperPonenPorQueElRangoDeLaSolicitadaSeEncuentraAntes(){
        //SOLICITADO
        when(peticion.getHoraInicio()).thenReturn(LocalTime.of(9,0,0));
        when(peticion.getHoraFin()).thenReturn(LocalTime.of(15,0,0));
        //VIGENTE
        when(peticionVigente.getHoraInicio()).thenReturn(LocalTime.of(20,0,0));
        when(peticionVigente.getHoraFin()).thenReturn(LocalTime.of(23,0,0));

        assertFalse(timeManager.estaOcupado(peticion, peticionVigente));
    }
    @Test
    public void lasPeticionesNoSeSuperPonenPorQueElRangoDeLaSolicitadaSeEncuentraDespues(){
        //SOLICITADO
        when(peticion.getHoraInicio()).thenReturn(LocalTime.of(20,0,0));
        when(peticion.getHoraFin()).thenReturn(LocalTime.of(23,0,0));
        //VIGENTE
        when(peticionVigente.getHoraInicio()).thenReturn(LocalTime.of(9,0,0));
        when(peticionVigente.getHoraFin()).thenReturn(LocalTime.of(15,0,0));

        assertFalse(timeManager.estaOcupado(peticion, peticionVigente));
    }




}
