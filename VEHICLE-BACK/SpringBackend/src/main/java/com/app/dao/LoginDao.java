package com.app.dao;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dto.LoginDTO;
import com.app.entities.Login;


public interface LoginDao extends JpaRepository<Login,Long> {

	@Query("select l from Login l where l.user.email=:Email")
	Optional<Login> findByEmail(String Email);
	
//	@Query("select l from Login l where l.userName=:Username")
	Optional<Login> findByUsername(String Username);

}
