package com.reservo.modelo.property;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@ToString

public class RangoHorario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalTime horarioInicio;

    @Column(nullable = false)
    private LocalTime horarioFin;

    public RangoHorario(LocalTime horarioInicio, LocalTime horarioFin) {
        this.horarioInicio = horarioInicio;
        this.horarioFin = horarioFin;
    }
}
