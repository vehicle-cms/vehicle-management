package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.entities.User;

public interface UserService {
	List<User> getAllDrivers();
	List<User> getAllManager();
	List<User> getAllCustomers();

	User addNewUser(User transientUser);

	Optional<User> getUserDetails(Long userId);

	User updateUser (User detachedUser);
	
	void deleteUser (Long UserId);
}
