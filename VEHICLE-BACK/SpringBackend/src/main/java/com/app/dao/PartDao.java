package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Part;

public interface PartDao extends JpaRepository<Part,Long> {
	List<Part> findAll();
	Optional<Part>findByName(String name);
}
