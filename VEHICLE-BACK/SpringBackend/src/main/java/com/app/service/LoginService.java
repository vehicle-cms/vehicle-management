package com.app.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.app.dto.LoginDTO;

public interface LoginService {

	ResponseEntity<String> addUserDetails(LoginDTO login);

	List<LoginDTO> getAll();

	ResponseEntity<?> login(LoginDTO login);

	LoginDTO findByEmail(String email);
	LoginDTO findByUsername(String username);

}
