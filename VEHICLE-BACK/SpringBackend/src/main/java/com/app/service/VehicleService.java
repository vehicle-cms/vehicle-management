package com.app.service;

import java.util.List;

import com.app.dto.VehicleDTO;
import com.app.entities.Vehicle;

public interface VehicleService {
	List<VehicleDTO> getAllVehicles();

	VehicleDTO getVehicleDetails(Long id);

	VehicleDTO addVehicleDetails(VehicleDTO vehicleDto);

	String deleteVehicle(Long vehicleId);

	Vehicle updateVehicle(Vehicle detachedVehicle,Long vehicleId);

	List<VehicleDTO> getAllVehiclesPaginated(int pageNumber,int pageSize);

	long countOfActive();
	long countOfInactive();
	long countOfUnderMaintenance();
	long vehicleCount();

	List<VehicleDTO> getAllActiveVehicles();
}
