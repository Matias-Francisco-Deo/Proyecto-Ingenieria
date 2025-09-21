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
    private LocalDate fechaDelEvento;

    //@Column(nullable = false)
    //private LocalDate FechaFin;//podrian ser 2 fechas?

    @Column(nullable = false)
    private LocalTime horaInicio;

    @Column(nullable = false)
    private LocalTime horaFin;

    @Column(nullable = false)
    private LocalDate fechaEmision;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "estadoId")
    private EstadoDePeticion estado;

    private PoliticasDeCancelacion politicaCancelacion;

    public Peticion(Usuario cliente,Inmueble inmueble,LocalDate fechaDelEvento,LocalTime horaInicio
                    ,LocalTime horaFin,Double price){
        this.cliente = cliente;
        this.inmueble = inmueble;
        this.price = price;
        this.fechaDelEvento = fechaDelEvento;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.estado = new Pendiente() ;
        this.politicaCancelacion = inmueble.getCancellation();
        this.fechaEmision = LocalDate.now();
    }

    public void aprobar(){
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