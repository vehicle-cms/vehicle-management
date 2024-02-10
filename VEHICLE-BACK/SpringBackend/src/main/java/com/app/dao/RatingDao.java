package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Rating;

public interface RatingDao extends JpaRepository<Rating,Long> {
	List<Rating> findAll();
}
