package com.app.controller;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.app.dto.UserDTO;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.service.UserService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;


@RestController
@RequestMapping("/user/driver")
@CrossOrigin(originPatterns = "http://localhost:*")
public class DriverController {
	@Autowired
	private UserService driverService;

	@GetMapping
	public List<UserDTO> listAllManager(){
		return driverService.getAllUserByRole(Role.DRIVER);
	}
	
	@GetMapping("/{driverId}")
	public UserDTO getDriverDetails(@PathVariable @NotNull Long driverId) {
		return driverService.getUserDetails(driverId,Role.DRIVER);
	}
	
	@PostMapping
	public UserDTO addCustomerDetails(@RequestBody UserDTO user) {
		return driverService.addUserDetails(user);
	}
	
	@PutMapping
	public UserDTO updateDriverDetails(@PathVariable @NotNull Long driverId,@RequestBody UserDTO detachedUser) {
		System.out.println("in update emp " + detachedUser);
		return driverService.updateUser(driverId,detachedUser);
	}
	
	@DeleteMapping("/{DriverId}")
	public String deleteDriverDetails(@PathVariable Long DriverId)
	{
		return driverService.deleteUser(DriverId);
	}
}
