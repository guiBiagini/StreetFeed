package com.dadm.streetfeed.controller;


import com.dadm.streetfeed.domain.Usuario;
import com.dadm.streetfeed.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class UsuarioController {
    @Autowired
    private UsuarioService service;

    @RequestMapping(method = RequestMethod.POST, value = "cadUsu")
    public ResponseEntity<Usuario> cadastra(@RequestBody Usuario us){
        return ResponseEntity.ok(service.create(us));
    }
}
