package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.OrderDao;
import com.app.entities.Orders;

import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderDao ordersDao;

    @Override
    public List<Orders> findOrders() {
        return ordersDao.findAll();
    }

    @Override
    public List<Orders> findBetweenDate(java.sql.Date date1, java.sql.Date date2) {
        return ordersDao.findByBookingDateBetween(date1, date2);
    }

    @Override
    public List<Orders> findByVehicleId(Long id) {
        return ordersDao.findByVehicleId(id);
    }

}
