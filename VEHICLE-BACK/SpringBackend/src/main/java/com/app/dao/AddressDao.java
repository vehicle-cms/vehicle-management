package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Address;

public interface AddressDao extends JpaRepository<Address,Long> {
	List<Address>findAll();
}
