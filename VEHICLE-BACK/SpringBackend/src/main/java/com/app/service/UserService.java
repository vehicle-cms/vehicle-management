package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.UserDTO;
import com.app.entities.User;

public interface UserService {
	List<UserDTO> getAllDrivers();
	List<UserDTO> getAllManager();
	List<UserDTO>  getAllCustomers();

	User addNewUser(User transientUser);

	UserDTO getUserDetails(Long userId);

	User updateUser (User detachedUser);
	
	void deleteUser (Long UserId);
}
