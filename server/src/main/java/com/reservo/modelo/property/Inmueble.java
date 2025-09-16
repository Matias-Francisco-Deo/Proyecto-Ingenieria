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
    private  String name;

    @Column(nullable = false)
    private  String description;


    @Column(nullable = false)
    private  Double price;

    @Column(nullable = false)
    private  String ubication; // dirección o localidad || inferir con base en las coords

    @Column(nullable = false)
    private  Integer capacity;

    @Column(nullable = false)
    private  String conditions;

    @ManyToOne(fetch = FetchType.EAGER)
    private  Usuario owner;

    @Column(nullable = false)
    private  LocalTime horaInicio;

    @Column(nullable = false)
    private  LocalTime horaFin;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private  PoliticasDeCancelacion cancellation;

    @ElementCollection
    private List<String> images = new ArrayList<>();

    public Inmueble(String name, String desc, Double price,
                    String ubi, Integer capacity, String condition,
                    LocalTime horaInicio, LocalTime horaFinal,
                    PoliticasDeCancelacion cancellation,List<String> images,Usuario owner) {
        this.name = name;
        this.description = desc;
        this.price = price;
        this.ubication = ubi;
        this.capacity = capacity;
        this.conditions = condition;
        this.owner = owner;
        this.horaInicio = horaInicio;
        this.horaFin = horaFinal;
        this.cancellation = cancellation;
        this.images.addAll(images);
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
