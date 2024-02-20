package com.app.security;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.LoginDao;
import com.app.dao.UserDao;
import com.app.entities.Login;
import com.app.entities.User;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private LoginDao loginDao;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println(username);
		Login lgn =loginDao.findByUsername(username)
				.orElseThrow(()->new ResourceNotFoundException("invalid Username"));

		System.out.println("User info id = " + lgn.getId() );
		return new CustomUserDetails(lgn);
	}

}
