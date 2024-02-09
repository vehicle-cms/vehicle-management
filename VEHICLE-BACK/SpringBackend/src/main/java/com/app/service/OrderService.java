package com.app.service;

import java.sql.Date;
import java.util.List;

import com.app.entities.Orders;

public interface OrderService {
    List<Orders> findOrders();

    List<Orders> findBetweenDate(Date date1, Date date2);

    List<Orders> findByVehicleId(Long id);
}
