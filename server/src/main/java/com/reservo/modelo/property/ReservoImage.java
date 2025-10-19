package com.reservo.modelo.property;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class ReservoImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String publicId;

    @Column()
    private String url;

    public ReservoImage(String publicId, String url) {
        this.publicId = publicId;
        this.url = url;
    }
}