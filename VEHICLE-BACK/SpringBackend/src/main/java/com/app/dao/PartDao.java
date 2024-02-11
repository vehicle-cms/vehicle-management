package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Part;

public interface PartDao extends JpaRepository<Part,Long> {

}
