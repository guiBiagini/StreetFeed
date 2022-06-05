package com.dadm.streetfeed.service;

import com.dadm.streetfeed.domain.Feedback;
import com.dadm.streetfeed.domain.Usuario;
import com.dadm.streetfeed.repository.FeedbackRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackService {
    @Autowired
    private FeedbackRepository repository;

    public Feedback create(Feedback fb){
        return repository.save(fb);
    }

    public Feedback getById(long id){
        Optional<Feedback> u = repository.findById(id);
        return u.isPresent() ? u.get() : new Feedback();
    }

    public List<Feedback> listFeedbacksByUsuario(long id_usuario){
        List<Feedback> feedbacks = repository.findByUsuario(id_usuario);
        return feedbacks != null && feedbacks.size() > 0 ? feedbacks : new ArrayList<>();
    }

    public List<Feedback> listFeedbacks(){
        List<Feedback> feedbacks = repository.findAll();
        return feedbacks.size() >0 ? feedbacks : new ArrayList<>();
    }

}
