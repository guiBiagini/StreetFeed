package com.dadm.streetfeed.controller;

import com.dadm.streetfeed.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class UsuarioController {
    @Autowired
    private UsuarioService service;
}
