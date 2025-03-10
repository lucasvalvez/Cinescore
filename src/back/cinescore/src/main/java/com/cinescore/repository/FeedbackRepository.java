package com.cinescore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinescore.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    
}
