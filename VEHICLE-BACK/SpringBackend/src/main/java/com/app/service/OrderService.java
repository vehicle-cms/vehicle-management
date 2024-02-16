package com.app.service;

import java.sql.Date;
import java.util.List;

import com.app.dto.Order1DTO;
import com.app.dto.OrderDTO;
import com.app.dto.UserDTO;

public interface OrderService {
    List<OrderDTO> getAllVehicles();

    List<OrderDTO> findBetweenDate(Date date1, Date date2);

    OrderDTO findByOrderId(Long id);

    List<OrderDTO> getAllOrdersPaginated(int pageNumber, int pageSize);

    OrderDTO createOrder(OrderDTO transientOrder);

    OrderDTO updateOrder(OrderDTO detachedOrder);

    String deleteOrder(Long orderId);
    
    long countOfPendingOrders();
    
    long countOfApprovedOrders();
    
    long countOfRejectedOrders();
    
    long orderCount();
}
