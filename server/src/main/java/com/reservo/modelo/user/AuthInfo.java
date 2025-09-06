package com.reservo.modelo.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity @Getter @Setter @ToString @NoArgsConstructor(force = true)
public class AuthInfo {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY) // usar UUID como id? // TODO
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private Usuario user;

    @Transient
    private String email;

    @Column(nullable = false)
    private String key;

    public AuthInfo( String key, Usuario user) {
        this.email = user.getEmail();
        this.key = key;
        this.user = user;
    }
}
