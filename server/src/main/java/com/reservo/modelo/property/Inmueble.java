package com.reservo.modelo.property;

import com.reservo.modelo.user.Usuario;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor(force = true)
@ToString

@Entity
public class Inmueble {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private final String name;

    @Column(nullable = false)
    private final String description;


    @Column(nullable = false)
    private final Double price;

    @Column(nullable = false)
    private final String ubication; // dirección o localidad || inferir con base en las coords

    @Column(nullable = false)
    private final Integer capacity;

    @Column(nullable = false)
    private final String conditions;

    @ManyToOne
    private final Usuario owner;

    @Column(nullable = false)
    private final LocalTime horaInicio;

    @Column(nullable = false)
    private final LocalTime horaFin;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private final PoliticasDeCancelacion cancellation;

//    @Column(nullable = false)
//    private final List<String> images = new ArrayList<>(); // en to' caso, la referencia al disco

    public Inmueble(String name, String desc, Double price,
                    String ubi, Integer capacity, String condition,
                    LocalTime horaInicio, LocalTime horaFinal,
                    PoliticasDeCancelacion cancellation) { // , Usuario owner
        this.name = name;
        this.description = desc;
        this.price = price;
        this.ubication = ubi;
        this.capacity = capacity;
        this.conditions = condition;
        this.owner = null;
        this.horaInicio = horaInicio;
        this.horaFin = horaFinal;
        this.cancellation = cancellation;

//      this.images.addAll(image);
    }

    public Inmueble(String name, String desc, Double price,
                    String ubi, Integer capacity, String condition,
                    LocalTime horaInicio, LocalTime horaFinal, Usuario owner,
                    PoliticasDeCancelacion cancellation) { // , Usuario owner
        this.name = name;
        this.description = desc;
        this.price = price;
        this.ubication = ubi;
        this.capacity = capacity;
        this.conditions = condition;
        this.horaInicio = horaInicio;
        this.horaFin = horaFinal;
        this.owner = owner;
        this.cancellation = cancellation;
//        this.images.addAll(image);
    }

}
