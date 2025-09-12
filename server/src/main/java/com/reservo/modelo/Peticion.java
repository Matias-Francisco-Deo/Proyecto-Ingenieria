package com.reservo.modelo;

import com.reservo.modelo.estadosReservas.EstadoDePeticion;
import com.reservo.modelo.estadosReservas.Pendiente;
import com.reservo.modelo.property.Inmueble;
import com.reservo.modelo.property.PoliticasDeCancelacion;
import com.reservo.modelo.user.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor(force = true)
@ToString

@Entity
public class Peticion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Usuario cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    private Inmueble inmueble;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private LocalDate Fecha;

    //@Column(nullable = false)
    //private LocalDate FechaFin;//podrian ser 2 fechas?

    @Column(nullable = false)
    private LocalTime horaInicio;

    @Column(nullable = false)
    private LocalTime horaFin;

    @Column(nullable = false)
    private EstadoDePeticion estado;// crear estados de la peticion

    @Column(nullable = false)
    private PoliticasDeCancelacion politicaCancelacion;

    public Peticion(Usuario cliente,Inmueble inmueble,Double price,LocalDate Fecha,LocalTime horaInicio
                    ,LocalTime horaFin,PoliticasDeCancelacion politicaCancelacion){
        this.cliente = cliente;
        this.inmueble = inmueble;
        this.price = price;
        this.Fecha = Fecha;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.estado = new Pendiente() ;
        this.politicaCancelacion = politicaCancelacion;
    }

    public void aprovar(){
        this.estado.aprobar(this);
    }

    public void cancelar(){
        this.estado.cancelar(this);
    }

    public void rechazar(){
        this.estado.rechazar(this);
    }

    public void finalizar(){
        this.estado.finalizar(this);
    }

}