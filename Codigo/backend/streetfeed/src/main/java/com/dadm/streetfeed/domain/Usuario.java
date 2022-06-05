package com.dadm.streetfeed.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private long id_usuario;

    @Column
    private String email;

    @Column
    private String senha;

    @Column
    private String telefone;

    @Column
    private String nome;

    @Column
    private String sobrenome;
}
