package com.app.dao;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.dto.OrderDTO;
import com.app.entities.OrderStatus;
import com.app.entities.Orders;

public interface OrderDao extends JpaRepository<Orders, Long> {
	List<Orders> findAll();

	List<Orders> findByBookingDateBetween(Date date1, Date date2);

	Optional<Orders> findById(Long id);

	Page<OrderDTO> findAllProjectedBy(PageRequest pageRequest);
	
	List<Orders> findByStatus(OrderStatus status);
	
	long countByStatus(OrderStatus status) ;

	List<Orders> findByCustomerId(Long customerId);

	
}
