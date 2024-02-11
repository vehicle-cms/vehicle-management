package com.app.service;

import java.util.List;

import com.app.entities.User;

public interface ManagerService {

		List<User> getAllManagers();

		User addNewManager(User transientManager);

		User getManagerDetails(Long ManagerId);

		User updateManager(User detachedManager);

		String deleteManager(Long ManagerId);	
	
}
