package com.app.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.OrderDao;
import com.app.dto.OrderDTO;
import com.app.entities.OrderStatus;
import com.app.entities.Orders;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderDao ordersDao;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<OrderDTO> getAllOrders() {
    	
        return ordersDao.findAll().stream()
                .map(order -> mapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> getOrderBetweenDate(Date date1, Date date2) {
        return ordersDao.findByBookingDateBetween(date1, date2).stream()
                .map(order -> mapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public OrderDTO findByOrderId(Long id) {
        return mapper.map(ordersDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("invalid order id")),
                OrderDTO.class);
    }

    @Override
    public List<OrderDTO> getAllOrdersPaginated(int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber - 1, pageSize);
        Page<OrderDTO> orderPage = ordersDao.findAllProjectedBy(pageRequest);
        return orderPage.getContent();
    }

    @Override
    public Orders createOrder(Orders transientOrder) {
        return ordersDao.save(transientOrder);
    }

    @Override
    public Orders updateOrder(Orders detachedOrder,Long orderId) {
        if (ordersDao.existsById(orderId)) {
        	detachedOrder.setId(orderId);
            return ordersDao.save(detachedOrder);
        }
        return null;
    }

    @Override
    public String deleteOrder(Long orderId) {
        if (ordersDao.existsById(orderId)) {
            ordersDao.deleteById(orderId);
            return "Order deleted.";
        }
        return "Deletion of order failed.";
    }

	@Override
	public long countOfPendingOrders() {
		return ordersDao.countByStatus(OrderStatus.PENDING);
	}

	@Override
	public long orderCount() {
		return ordersDao.count();
	}

	@Override
	public long countOfApprovedOrders() {
		return ordersDao.countByStatus(OrderStatus.APPROVED);
	}

	@Override
	public long countOfRejectedOrders() {
		return ordersDao.countByStatus(OrderStatus.REJECTED);
	}

	@Override
	public List<OrderDTO> getAllCustomerOrders(Long customerId) {
		return 	ordersDao.findByCustomerId(customerId).stream()
                .map(order -> mapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
	}

     
}
