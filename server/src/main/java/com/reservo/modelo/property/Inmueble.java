package com.reservo.modelo.property;

import com.reservo.modelo.user.Usuario;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

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

//    @Column(nullable = false)
//    private final List<RangoHorario> timeRanges;
//    @Column(nullable = false)
//    private final List<String> images = new ArrayList<>(); // en to' caso, la referencia al disco
//    @Column(nullable = false)
//    private final String cancellationPolicy; // object

    public Inmueble(String name, String desc, Double price,
                    String ubi, Integer capacity, String condition,
                    LocalTime horaInicio, LocalTime horaFinal) { // , Usuario owner
        this.name = name;
        this.description = desc;
        this.price = price;
        this.ubication = ubi;
        this.capacity = capacity;
        this.conditions = condition;
        this.owner = null;
        this.horaInicio = horaInicio;
        this.horaFin = horaFinal;
//        this.images.addAll(image);
//        this.cancellationPolicy = cancellationPolicy;
    }

    public Inmueble(String name, String desc, Double price,
                    String ubi, Integer capacity, String condition,
                    LocalTime horaInicio, LocalTime horaFinal, Usuario owner) { // , Usuario owner
        this.name = name;
        this.description = desc;
        this.price = price;
        this.ubication = ubi;
        this.capacity = capacity;
        this.conditions = condition;
        this.horaInicio = horaInicio;
        this.horaFin = horaFinal;
        this.owner = owner;
//        this.images.addAll(image);
//        this.cancellationPolicy = cancellationPolicy;
    }

}
