package com.app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.UserDao;
import com.app.entities.Role;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;


	@Override
	public List<User> getAllDrivers() {
		return userDao.findByRole(Role.DRIVER);
	}

	@Override
	public List<User> getAllManager() {
		return userDao.findByRole(Role.MANAGER);
	}

	@Override
	public List<User> getAllCustomers() {
		return userDao.findByRole(Role.CUSTOMER);
	}
	
	@Override
	public User addNewUser(User transientUser) {
		return userDao.save(transientUser);
	}

	@Override
	public Optional<User> getUserDetails(Long userId) {
		return userDao.findById(userId);
	}

	@Override
	public User updateUser(User detachedUser) {
		if(userDao.existsById(detachedUser.getId())) {
			return userDao.save(detachedUser);
		}
		return null;
	}

	@Override
	public void deleteUser(Long UserId) {
		if(userDao.existsById(UserId)) {
			userDao.deleteById(UserId);
		}
	}


	
	
	

}
