package com.app.service;

import java.util.Date;
import java.util.List;

import com.app.dto.Order1DTO;
import com.app.dto.OrderDTO;
import com.app.entities.Orders;

public interface OrderService {
    List<OrderDTO> getAllOrders();

    List<OrderDTO> getOrderBetweenDate(Date date1, Date date2);

    OrderDTO findByOrderId(Long id);

    List<OrderDTO> getAllOrdersPaginated(int pageNumber, int pageSize);

    Orders createOrder(Orders transientOrder);

    OrderDTO updateOrder(OrderDTO detachedOrder);

    String deleteOrder(Long orderId);
    
    long countOfPendingOrders();
    
    long countOfApprovedOrders();
    
    long countOfRejectedOrders();
    
    long orderCount();
}
