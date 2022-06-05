package com.dadm.streetfeed.repository;

import com.dadm.streetfeed.domain.Feedback;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {
    public List<Feedback> findByUsuario(long id);
}
