package com.reservo.modelo.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity @Getter @Setter @ToString @NoArgsConstructor(force = true)
public class AuthInfo {

    @Id
    @GeneratedValue(strategy=GenerationType.UUID) // el UUID se genera acá
    private String id;

    @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private Usuario user;

    @Transient
    private String email;

    public AuthInfo(Usuario user) {
        this.email = user.getEmail();
        this.user = user;
    }
}
