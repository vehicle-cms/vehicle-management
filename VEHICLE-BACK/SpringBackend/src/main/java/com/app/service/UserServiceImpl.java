package com.app.service;

import java.util.List;
import java.util.Optional;
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
	public List<UserDTO> getAllUserByRole(Role role) {
		return userDao.findByRole(role)
				 .stream()
				 .map(User -> mapper.map(User, UserDTO.class))
				 .collect(Collectors.toList());
	}

	@Override
	public UserDTO addUserDetails(UserDTO transientUser) {
		return mapper.map(userDao.save(mapper.map(transientUser, User.class)), UserDTO.class);
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
			User user = userDao.findById(id).get();
			user.setMobile(detachedUser.getMobile());//mobile updating
			//write all the setter here to update all the fields that u want to update

			return mapper.map(userDao.save(user), UserDTO.class);
		}
		throw new ResourceNotFoundException("Invalid emp id !!!!");
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

	@Override
	public long countOfDrivers() {
		return userDao.countByRole(Role.DRIVER);
	}


}
