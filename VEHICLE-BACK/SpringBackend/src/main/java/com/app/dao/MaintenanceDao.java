package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Maintenance;


public interface MaintenanceDao extends JpaRepository<Maintenance,Long> {
//	List<Maintenance>findAll();
//	List<Maintenance>findByStatus();	
}
