package com.app.service;

import java.util.List;

import com.app.dto.UserDTO;

public interface UserService {
	List<UserDTO> getAllDrivers();
	List<UserDTO> getAllManager();
	List<UserDTO>  getAllCustomers();

	UserDTO addUserDetails(UserDTO transientUser);

	UserDTO getUserDetails(Long userId);

	UserDTO updateUser(UserDTO detachedUser);
	
	String deleteUser(Long UserId);
}
