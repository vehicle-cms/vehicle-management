package com.app.service;

import java.util.List;

import com.app.dto.VehicleDTO;

public interface VehicleService {
	List<VehicleDTO> getAllVehicles(); 
	
	VehicleDTO getVehicleDetails(Long id);
	
	VehicleDTO addVehicleDetails(VehicleDTO vehicleDto);
	
	
	List<VehicleDTO> getAllVehiclesPaginated(int pageNumber,int pageSize);
}
