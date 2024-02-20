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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderDTO;
//import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.UserDTO;
import com.app.entities.Role;
import com.app.service.OrderService;
//import com.app.entities.User;
import com.app.service.UserService;

//import io.swagger.v3.oas.annotations.parameters.RequestBody;


@RestController
@RequestMapping("/user/customer")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin
public class CustomerController {
	@Autowired
	private UserService customerService;

	@Autowired
	private OrderService orderService;
	
	@GetMapping
	public List<UserDTO> listAllCustomers(){
		return customerService.getAllUserByRole(Role.CUSTOMER);
	}
	
	@GetMapping("/{customerId}")
	public UserDTO getCustomerDetails(@PathVariable @NotNull Long customerId) {
		return customerService.getUserDetails(customerId,Role.CUSTOMER);
	}
//	@PostMapping
//	public UserDTO addCustomerDetails(@RequestBody UserDTO user) {
//		System.out.println("in add user " + user.toString());
//			return customerService.addUserDetails(user);
//	}
	
	@PutMapping("/{customerId}")
	public UserDTO updateCustomerDetails(@PathVariable @NotNull Long customerId,@RequestBody UserDTO detachedUser) {
		System.out.println("in update user " + detachedUser);
		return customerService.updateUser(customerId,detachedUser);
	}
	
	@DeleteMapping("/{customerId}")
	public String deleteCustomerDetails(@PathVariable Long customerId)
	{
		return customerService.deleteUser(customerId);
	}
	
	@GetMapping("/orders/{customerId}")
	public List<OrderDTO> listAllOrders(@PathVariable Long customerId) {
        return orderService.getAllCustomerOrders(customerId);
    }
}
