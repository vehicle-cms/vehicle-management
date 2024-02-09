package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.VehicleDao;
import com.app.dto.VehicleDTO;
import com.app.entities.Vehicle;

@Service
@Transactional
public class VehicleServiceImp implements VehicleService{

	private VehicleDao vehicleDao;
	
	private ModelMapper mapper;
	
	@Override
	public List<VehicleDTO> getAllVehicles() {
		
		return vehicleDao.findAll()
						 .stream()
						 .map(vehicle -> mapper.map(vehicle, VehicleDTO.class))
						 .collect(Collectors.toList());
	}

	@Override
	public VehicleDTO getVehicleDetails(Long id) {
		
		return mapper.map(vehicleDao.findById(id)
					 .orElseThrow(()->
					 new ResourceNotFoundException("invalid vehicle id")),
					 VehicleDTO.class);
	}

	@Override
	public VehicleDTO addVehicleDetails(VehicleDTO vehicleDto) {
		Vehicle vehicle = mapper.map(vehicleDto, Vehicle.class);
		return mapper.map(vehicleDao.save(vehicle), VehicleDTO.class);
	}


	@Override
	public List<VehicleDTO> getAllVehiclesPaginated(int pageNumber, int pageSize) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
		List<Vehicle> vehicleList = vehicleDao.findAll(pageable)
											  .getContent();
		return vehicleList.stream()
						  .map(vehicle -> mapper.map(vehicle, VehicleDTO.class))
						  .collect(Collectors.toList());
	}
	
}
