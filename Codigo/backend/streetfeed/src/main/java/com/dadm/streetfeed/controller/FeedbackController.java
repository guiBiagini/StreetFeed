package com.dadm.streetfeed.controller;

import com.dadm.streetfeed.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class FeedbackController {
    @Autowired
    private FeedbackService service;
}
