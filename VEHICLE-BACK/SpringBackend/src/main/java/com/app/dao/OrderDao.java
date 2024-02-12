package com.app.dao;

import java.sql.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.dto.OrderDTO;
import com.app.entities.Orders;

public interface OrderDao extends JpaRepository<Orders, Long> {
	List<Orders> findAll();

	List<Orders> findByBookingDateBetween(Date date1, Date date2);

	Orders findByOrderId(Long id);

	Page<OrderDTO> findAllProjectedBy(PageRequest pageRequest);

}
