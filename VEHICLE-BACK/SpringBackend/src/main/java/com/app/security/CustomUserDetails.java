package com.app.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.app.entities.Login;


public class CustomUserDetails implements UserDetails {
	private Login login;

	public CustomUserDetails(Login login) {
		this.login = login;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
	
		return List.of(new 
				SimpleGrantedAuthority(login.getUser().getRole().toString()));
	}

	@Override
	public String getPassword() {
	
		return login.getPassword();
	}

	@Override
	public String getUsername() {

		return login.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {

		return true;
	}

	@Override
	public boolean isAccountNonLocked() {

		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {

		return true;
	}

	@Override
	public boolean isEnabled() {

		return true;
	}

}
