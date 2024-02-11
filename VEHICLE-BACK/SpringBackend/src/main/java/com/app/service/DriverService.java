package com.app.service;

import java.util.List;

import com.app.entities.User;

public interface DriverService {
	List<User> getAllDrivers();

	User addNewDriver(User transientDriver);

	User getDriverDetails(Long driverId);

	User updateDriver(User detachedDriver);

	String deleteDriver(Long DriverId);
}
