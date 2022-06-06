package com.dadm.streetfeed.controller;

import com.dadm.streetfeed.domain.Feedback;
import com.dadm.streetfeed.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class FeedbackController {
    @Autowired
    private FeedbackService service;

    @RequestMapping(method = RequestMethod.POST, value = "cadFb")
    public ResponseEntity<Feedback> cadastra(@RequestBody Feedback fb){
        return ResponseEntity.ok(service.create(fb));
    }

    @RequestMapping(method = RequestMethod.GET, value = "listFb")
    public ResponseEntity<List<Feedback>> lista(){
        return ResponseEntity.ok(service.listFeedbacks());
    }

    @RequestMapping(method = RequestMethod.POST, value = "listFbUser")
    public ResponseEntity<List<Feedback>> listaByUser(@RequestParam long id){
        return ResponseEntity.ok(service.listFeedbacksByUsuario(id));
    }
}
