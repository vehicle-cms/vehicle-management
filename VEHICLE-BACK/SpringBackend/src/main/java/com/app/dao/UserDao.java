package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Role;
import com.app.entities.User;

public interface UserDao extends JpaRepository<User,Long> {
	List<User> findByRole(Role role);
	Optional<User> findById(Long Id);
}
