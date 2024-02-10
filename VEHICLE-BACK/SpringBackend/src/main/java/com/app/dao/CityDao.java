package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.City;

<<<<<<< HEAD
public interface CityDao extends JpaRepository<City,Long> {
	List<City>findAll();
	Optional<City>findByPincode(String pincode);
=======
public interface CityDao extends JpaRepository<City, Long> {

>>>>>>> bc5320de08002d9f687f08063e17e3e7b6514046
}
