package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.FuelType;
import com.app.entities.Vehicle;

public interface VehicleDao extends JpaRepository<Vehicle,Long> {
	Optional<Vehicle> findByVehicleNumber(String vehicleNumber);
	Optional<Vehicle> findByRegistration(String registration);
	List<Vehicle> findByStatus(boolean status);
	List<Vehicle> findByFuelType(FuelType fuelType);
}
