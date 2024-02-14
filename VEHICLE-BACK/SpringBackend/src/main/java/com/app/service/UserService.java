package com.app.service;

import java.util.List;

import com.app.dto.UserDTO;
import com.app.entities.Role;
import com.app.entities.User;

public interface UserService {
	List<UserDTO> getAllUserByRole(Role role);
//	List<UserDTO> getAllManager();
//	List<UserDTO>  getAllCustomers();

	UserDTO addUserDetails(UserDTO transientUser);

	UserDTO getUserDetails(Long userId,Role role);

	UserDTO updateUser(Long id,UserDTO detachedUser);
	
	String deleteUser(Long UserId);
}
