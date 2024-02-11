package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Maintenance;


public interface MaintenanceDao extends JpaRepository<Maintenance,Long> {

}
