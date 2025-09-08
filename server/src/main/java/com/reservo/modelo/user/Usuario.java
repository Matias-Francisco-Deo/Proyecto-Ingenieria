package com.reservo.modelo.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @NoArgsConstructor(force = true)
@ToString

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "email" }) })
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private final String password;

    @Column(nullable = false, length = 100)
    private final String name;

    @Column(nullable = false)
    private final String email;

    public Usuario(String name, String password, String email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }
}
