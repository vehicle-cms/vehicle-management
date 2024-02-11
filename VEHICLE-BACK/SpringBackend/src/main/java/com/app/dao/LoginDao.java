package com.app.dao;



import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Login;


public interface LoginDao extends JpaRepository<Login,Long> {

}
