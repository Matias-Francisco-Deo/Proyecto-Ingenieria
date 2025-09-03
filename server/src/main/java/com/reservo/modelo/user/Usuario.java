package com.reservo.modelo.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @NoArgsConstructor(force = true)
@ToString

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "name" }) })
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private final String password;

    @Column(nullable = false)
    private final String name;

    public Usuario(String name, String password) {
        this.name = name;
        this.password = password;
    }
}
