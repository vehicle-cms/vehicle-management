package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.UserDao;
import com.app.dto.UserDTO;
import com.app.entities.Role;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	@Autowired
	private ModelMapper mapper;


	@Override
	public List<UserDTO> getAllDrivers() {
		return userDao.findByRole(Role.DRIVER)
				 .stream()
				 .map(User -> mapper.map(User, UserDTO.class))
				 .collect(Collectors.toList());
	}

	@Override
	public List<UserDTO> getAllManager() {
		return userDao.findByRole(Role.MANAGER)
				 .stream()
				 .map(User -> mapper.map(User, UserDTO.class))
				 .collect(Collectors.toList());
	}

	@Override
	public List<UserDTO> getAllCustomers() {
		return userDao.findByRole(Role.CUSTOMER)
				 .stream()
				 .map(User -> mapper.map(User, UserDTO.class))
				 .collect(Collectors.toList());
	}
	
	@Override
	public UserDTO addUserDetails(UserDTO transientUser) {
		return mapper.map(userDao.save(mapper.map(transientUser, User.class)), UserDTO.class);
	}

	@Override
	public UserDTO getUserDetails(Long userId) {
		return mapper.map(userDao.findById(userId)
				 .orElseThrow(()->
				 new ResourceNotFoundException("invalid id")),
				 UserDTO.class);
	}

	@Override
	public UserDTO updateUser(UserDTO detachedUser) {
		if(userDao.existsById(detachedUser.getId())) {
			return mapper.map(userDao.save(mapper.map(detachedUser, User.class)), UserDTO.class);
		}
		return null;
	}

	@Override
	public String deleteUser(Long UserId) {
		if(userDao.existsById(UserId))
		{
			userDao.deleteById(UserId);
			return "deleted emp details...";
		}
		return "deletion of emp details failed !!!!!";
	}


}
