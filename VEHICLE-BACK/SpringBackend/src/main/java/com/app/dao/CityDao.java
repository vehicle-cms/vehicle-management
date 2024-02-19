package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.City;

public interface CityDao extends JpaRepository<City,Long> {
	List<City>findAll();
//	City findByPincode();
	Optional<City>findByPincode(String pincode);
}
