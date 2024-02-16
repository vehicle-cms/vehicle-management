package com.app.controller;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.app.dto.UserDTO;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.service.UserService;

//import io.swagger.v3.oas.annotations.parameters.RequestBody;


@RestController
@RequestMapping("/user/manager")
@CrossOrigin(originPatterns = "http://localhost:*")
public class ManagerController {
	@Autowired
	private UserService managerService;

	@GetMapping
	public List<UserDTO> listAllManager(){
		return managerService.getAllUserByRole(Role.MANAGER);
	}
	
	@GetMapping("/{managerId}")
	public UserDTO getManagerDetails(@PathVariable @NotNull Long managerId) {
		return managerService.getUserDetails(managerId,Role.MANAGER);
	}
	@PostMapping
	public UserDTO addManagerDetails(@RequestBody UserDTO user) {
		return managerService.addUserDetails(user);
	}
	
	@PutMapping
	public UserDTO updateManagerDetails(@PathVariable @NotNull Long managerId,@RequestBody UserDTO detachedUser) {
		System.out.println("in update emp " + detachedUser);
		return managerService.updateUser(managerId,detachedUser);
	}
	
	@DeleteMapping("/{managerId}")
	public String deleteManagerDetails(@PathVariable Long managerId)
	{
		return managerService.deleteUser(managerId);
	}
	
	@GetMapping("manager-count")
	public ResponseEntity<?> getDriverCount(){
		long count = managerService.countOfManagers();
		return ResponseEntity.ok(count);
	}
}
