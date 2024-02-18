package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dto.MaintenanceDTO;
import com.app.dto.OrderDTO;
import com.app.entities.Maintenance;


public interface MaintenanceDao extends JpaRepository<Maintenance,Long> {
//	List<Maintenance>findAll();
//	List<Maintenance>findByStatus();
	
	@Query("select m from Maintenance m left join fetch m.parts where m.id=:Id")
	Optional<Maintenance> getMaintenanceAndPartsById(Long Id);
	
	Page<MaintenanceDTO> findAllProjectedBy(PageRequest pageRequest);
}
