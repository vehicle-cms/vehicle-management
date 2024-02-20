package com.app.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.OrderDao;
import com.app.dao.UserDao;
import com.app.dao.VehicleDao;
import com.app.dto.OrderDTO;
import com.app.entities.OrderStatus;
import com.app.entities.Orders;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.entities.Vehicle;

import java.io.ObjectInputFilter.Status;
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
    private UserDao userDao;
    
    @Autowired
    private VehicleDao vehicleDao;
    
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
    	
    	if(userDao.existsById(transientOrder.getCustomer().getId())) {
    		User u=userDao.findById(transientOrder.getCustomer().getId()).get();
    		transientOrder.setCustomer(u);
    		if(u.getRole().equals(Role.CUSTOMER)) {
    			transientOrder.setStatus(OrderStatus.PENDING);
    			long differenceInMillis = Math.abs(transientOrder.getBookingDate().getTime() - transientOrder.getReturnDate().getTime());
    			long differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
    			transientOrder.setDays(differenceInDays);
    			Vehicle vehicle = vehicleDao.findById(transientOrder.getVehicle().getId()).orElseThrow(()-> new ResourceNotFoundException("invalid vehicle id"));
    			transientOrder.setVehicle(vehicle);
    			transientOrder.setFare(differenceInDays*vehicle.getRatePerDay());
    			return ordersDao.save(transientOrder);
    			
    		}
    	}
    	throw new ResourceNotFoundException("Invalid customer id");
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
