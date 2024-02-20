package com.app.controller;

import java.util.List;
import javax.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.app.dto.VehicleDTO;
import com.app.entities.Vehicle;
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

	@GetMapping("/active")
	public List<VehicleDTO> listAllActiveVehicles(){
		return vehicleService.getAllActiveVehicles();
	}

	@GetMapping("/{vehicleId}")
	public VehicleDTO getVehicleDetails(@PathVariable @NotNull Long vehicleId) {
		return vehicleService.getVehicleDetails(vehicleId);
	}

	@PostMapping
	public VehicleDTO addVehicle(@RequestBody VehicleDTO vehicle) {
		return vehicleService.addVehicleDetails(vehicle);
	}

	 @PutMapping("/{id}")
	    public Vehicle updateVehicle(@PathVariable Long id,@RequestBody Vehicle detachedOrder) {
	        return vehicleService.updateVehicle(detachedOrder,id);
	    }

	@DeleteMapping("/{vehicleId}")
	public String deleteVehicle(@PathVariable Long vehicleId) {
		return vehicleService.deleteVehicle(vehicleId);
	}

	@GetMapping("/paginate")
	public ResponseEntity<?> getAllVehiclesPaginated(
			@RequestParam(defaultValue = "0", required = false) int pageNumber,
			@RequestParam(defaultValue = "10", required = false) int pageSize){
		
		List<VehicleDTO> vehicleList = vehicleService
						.getAllVehiclesPaginated(pageNumber, pageSize);
		if(vehicleList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		return ResponseEntity.ok(vehicleList);
	}

	@GetMapping("/active-count")
	public ResponseEntity<?> getVehicleActiveCount(){
		long count = vehicleService.countOfActive();
		return ResponseEntity.ok(count);
	}

	@GetMapping("/inactive-count")
	public ResponseEntity<?> getVehicleInactiveCount(){
		long count = vehicleService.countOfInactive();
		return ResponseEntity.ok(count);
	}

	@GetMapping("/maintenance-count")
	public ResponseEntity<?> getVehicleMaintenanceCount(){
		long count = vehicleService.countOfUnderMaintenance();
		return ResponseEntity.ok(count);
	}

	@GetMapping("/vehicle-count")
	public ResponseEntity<?> getVehicleCount(){
		 long count = vehicleService.vehicleCount();
		 return ResponseEntity.ok(count);
	}

}
