package com.app.dao;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Orders;

public interface OrderDao extends JpaRepository<Orders, Long> {
	List<Orders> findAll();

	List<Orders> findByBookingDateBetween(Date date1, Date date2);

	List<Orders> findByVehicleId(Long id);
}
