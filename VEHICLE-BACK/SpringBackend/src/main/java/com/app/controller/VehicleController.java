package com.app.controller;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.VehicleDTO;
import com.app.service.VehicleService;

@RestController
@RequestMapping("/vehicles")
@CrossOrigin(originPatterns = "http://localhost:*")
public class VehicleController {
	@Autowired
	private VehicleService vehicleService;

	@GetMapping
	public List<VehicleDTO> listAllVehicles(){
		return vehicleService.getAllVehicles();
	}
	
	@GetMapping("/{empId}")
	public VehicleDTO getVehicleDetails(@PathVariable @NotNull Long vehicleId) {
		return vehicleService.getVehicleDetails(vehicleId);
	}
}
