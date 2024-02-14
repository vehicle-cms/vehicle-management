package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.FuelType;
import com.app.entities.Vehicle;
import com.app.entities.VehicleStatus;
import com.app.entities.VehicleType;

public interface VehicleDao extends JpaRepository<Vehicle,Long> {
	Optional<Vehicle> findByVehicleNumber(String vehicleNumber);
	Optional<Vehicle> findByRegistration(String registration);
	List<Vehicle> findByStatus(VehicleStatus status);
	List<Vehicle> findByModel(String model);
	List<Vehicle> findByFuelType(FuelType fuelType);
	List<Vehicle> findByVehicleType(VehicleType vehicleType);
	long countByStatus(VehicleStatus status);
}
