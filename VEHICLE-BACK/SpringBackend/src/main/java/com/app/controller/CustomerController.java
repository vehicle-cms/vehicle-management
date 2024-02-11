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
@RequestMapping("/user/customer")
@CrossOrigin(originPatterns = "http://localhost:*")
public class CustomerController {
	@Autowired
	private UserService customerService;

	@GetMapping
	public List<UserDTO> listAllCustomers(){
		return customerService.getAllCustomers();
	}
	
	@GetMapping("/{customerId}")
	public UserDTO getCustomerDetails(@PathVariable @NotNull Long customerId) {
		return customerService.getUserDetails(customerId);
	}
	
}
