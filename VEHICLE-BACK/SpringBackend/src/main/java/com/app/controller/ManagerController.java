package com.app.controller;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.app.dto.UserDTO;

import com.app.service.UserService;


@RestController
@RequestMapping("/user/manager")
@CrossOrigin(originPatterns = "http://localhost:*")
public class ManagerController {
	@Autowired
	private UserService managerService;

	@GetMapping
	public List<UserDTO> listAllManager(){
		return managerService.getAllManager();
	}
	
	@GetMapping("/{managerId}")
	public UserDTO getManagerDetails(@PathVariable @NotNull Long managerId) {
		return managerService.getUserDetails(managerId);
	}
	
}
