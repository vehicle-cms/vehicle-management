package com.app.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AddressDao;
import com.app.dao.CityDao;
import com.app.dao.LoginDao;
import com.app.dao.UserDao;
import com.app.dto.LoginDTO;
import com.app.dto.UserDTO;
import com.app.entities.Address;
import com.app.entities.City;
import com.app.entities.Login;
import com.app.entities.Role;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	
	@Autowired
	private LoginDao loginDao;
	
	@Autowired
	private UserDao userDao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private AddressDao addDao;
	@Autowired
	private CityDao cityDao;


	@Override
	public List<UserDTO> getAllUserByRole(Role role) {
		return userDao.findByRole(role)
				 .stream()
				 .map(User -> mapper.map(User, UserDTO.class))
				 .collect(Collectors.toList());
	}

	@Override
	public LoginDTO addUserDetails(LoginDTO transientUser) {
		
		Login log= mapper.map(transientUser, Login.class);
		City city= cityDao.findByPincode(log.getUser().getAddress().getPincode().getPincode()).orElseThrow(()-> new ResourceNotFoundException("invalid pincodeS"));
		log.getUser().setCreatedOn(new Date());
		log.getUser().getAddress().setPincode(city);
		return mapper.map(loginDao.save(log), LoginDTO.class);
	}

	@Override
	public UserDTO getUserDetails(Long userId,Role role) {
		return mapper.map(userDao.findByIdAndRole(userId,role)
				 .orElseThrow(()->
				 new ResourceNotFoundException("invalid id")),
				 UserDTO.class);
	}

	@Override
	public UserDTO updateUser(Long id,UserDTO detachedUser) {
		if(userDao.existsById(id)) {
			detachedUser.setId(id);
			return mapper.map(userDao.save(mapper.map(detachedUser, User.class)), UserDTO.class);
		}
		throw new ResourceNotFoundException("Invalid user id !!!!");
	}

	@Override
	public String deleteUser(Long UserId) {
		if(loginDao.existsById(UserId))
		{
			loginDao.deleteById(UserId);
			return "deleted user details...";
		}
		return "deletion of user details failed !!!!!";
	}

	@Override
	public long countOfDrivers() {
		return userDao.countByRole(Role.DRIVER);
	}
	
	@Override
	public long countOfManagers() {
		return userDao.countByRole(Role.MANAGER);
	}

	@Override
	public UserDTO addUserDetails(UserDTO user) {
			
		return mapper.map(userDao.save(mapper.map(user, User.class)), UserDTO.class);
	}



}
