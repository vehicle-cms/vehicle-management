package com.app.service;

import java.util.List;

import com.app.entities.User;

public interface UserService {
	List<User> getAllDrivers();
	List<User> getAllManager();

	User addNewUser(User transientUser);

	User getUserDetails(Long userId);

	User updateUser (User detachedUser);

	String deleteUser (Long UserId);
}
