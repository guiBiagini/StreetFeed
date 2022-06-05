package com.dadm.streetfeed.service;

import com.dadm.streetfeed.domain.Usuario;
import com.dadm.streetfeed.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;

    public Usuario create(Usuario us){
        return repository.save(us);
    }

    public Usuario getUsuarioById(long id){
        Optional<Usuario> u = repository.findById(id);
        return u.isPresent() ? u.get() : new Usuario();
    }
}
