package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AddressDao;
import com.app.dao.LoginDao;
import com.app.dao.UserDao;
import com.app.dto.LoginDTO;
import com.app.dto.UserDTO;
import com.app.entities.Address;
import com.app.entities.Login;
import com.app.entities.User;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {
	@Autowired
	private LoginDao loginDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private AddressDao addressDao;
	@Autowired
	private ModelMapper mapper;
	
	
	@Override
	public ResponseEntity<String> addUserDetails(LoginDTO login) {
	
			Login logn =loginDao.save(mapper.map(login, Login.class));
			return ResponseEntity.ok("New User "+logn.getUser().getFirstName()+" is created");
		
	}


	@Override
	public List<LoginDTO> getAll() {
		
		return loginDao.findAll()
				.stream()
				.map(login-> mapper.map(login, LoginDTO.class))
				.collect(Collectors.toList());
	}


	@Override
	public ResponseEntity<?> login(LoginDTO login) {

		Login lgn =loginDao.findByEmail(login.getUser().getEmail()).orElseThrow(()->new ResourceNotFoundException("invalid Email"));
		if(lgn.getPassword().equals(login.getPassword()))
			return ResponseEntity.ok(mapper.map(lgn.getUser(), UserDTO.class));
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("wrong credentials");
	}


	@Override
	public LoginDTO findByEmail(String email) {
		
		Login log = loginDao.findByEmail(email).orElseThrow(()-> new ResourceNotFoundException("No Email Found!"));
		return mapper.map(log, LoginDTO.class);
	}

 
	@Override
	public LoginDTO findByUsername(String username) {
		
		Login log = loginDao.findByUsername(username).orElseThrow(()-> new ResourceNotFoundException("invalid usernaame "));
		
		return mapper.map(log, LoginDTO.class);
	}
	
	
	

}
