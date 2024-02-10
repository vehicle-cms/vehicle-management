package com.app.dao;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Login;


public interface LoginDao extends JpaRepository<Login,Long> {
	Optional<Login> findByUserEmail(String email);
	List<Login>findAllList();
}
