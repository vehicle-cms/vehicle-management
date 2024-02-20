package com.app.service;

import java.util.List;

import com.app.dto.LoginDTO;
import com.app.dto.UserDTO;
import com.app.entities.Role;

public interface UserService {
	List<UserDTO> getAllUserByRole(Role role);
//	List<UserDTO> getAllManager();
//	List<UserDTO>  getAllCustomers();

	LoginDTO addUserDetails(LoginDTO transientUser);

	UserDTO getUserDetails(Long userId,Role role);

	UserDTO updateUser(Long id,UserDTO detachedUser);
	
	String deleteUser(Long UserId);
	
	long countOfDrivers();
	long countOfManagers();

	UserDTO addUserDetails(UserDTO user);
}
