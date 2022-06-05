package com.dadm.streetfeed.repository;

import com.dadm.streetfeed.domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
}
