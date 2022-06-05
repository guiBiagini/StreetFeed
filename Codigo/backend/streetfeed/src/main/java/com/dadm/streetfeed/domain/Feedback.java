package com.dadm.streetfeed.domain;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
@Data
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id_feedback;

    @Column
    private String x;

    @Column
    private String y;

    @Column
    private String z;

    @Column
    private LocalDateTime createdAt;

    @Column
    private String tipo;

    @Column
    private String descricao;

    @Column
    private int score;

    @Column
    private long usuario;
}
