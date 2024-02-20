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
import com.app.entities.User;
import com.app.entities.Vehicle;
import com.app.entities.VehicleStatus;

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
    UserDao userDao;
    
    @Autowired
    VehicleDao vehicleDao;

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
        
        	 if (detachedOrder != null && detachedOrder.getStatus() == OrderStatus.COMPLETED) {
                 // Update driver and vehicle status to ACTIVE
                 User driver = detachedOrder.getDriver();
                 if (driver != null) {
                	 driver.setId(driver.getId());
                     driver.setAssigned(false);
                     userDao.save(driver);
                 }

                 Vehicle vehicle = detachedOrder.getVehicle();
                 if (vehicle != null) {
                	 vehicle.setId(vehicle.getId());
                     vehicle.setStatus(VehicleStatus.ACTIVE);;
                     vehicleDao.save(vehicle);
                 }
                 return ordersDao.save(detachedOrder); 
             }else if(detachedOrder != null && detachedOrder.getStatus() == OrderStatus.APPROVED){
            	   User driver = detachedOrder.getDriver();
                   if (driver != null) {
                	   driver.setId(driver.getId());
                       driver.setAssigned(true);
                       userDao.save(driver);
                   }

                   Vehicle vehicle = detachedOrder.getVehicle();
                   if (vehicle != null) {
                	   vehicle.setId(vehicle.getId());
                       vehicle.setStatus(VehicleStatus.INACTIVE);;
                       vehicleDao.save(vehicle);
                   }
                   return ordersDao.save(detachedOrder); 
             }else{
            	 return ordersDao.save(detachedOrder);            	 
             }
        	
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

     
}
