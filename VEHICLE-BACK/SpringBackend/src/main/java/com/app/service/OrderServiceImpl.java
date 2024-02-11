package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.OrderDao;
import com.app.entities.Orders;

import java.sql.Date;
import java.util.List;

import javax.transaction.Transactional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderDao ordersDao;

    @Override
    public List<Orders> findOrders() {
        return ordersDao.findAll();
    }

    @Override
    public List<Orders> findBetweenDate(Date date1, Date date2) {
        return ordersDao.findByBookingDateBetween(date1, date2);
    }

    @Override
    public List<Orders> findByVehicleId(Long id) {
        return ordersDao.findByVehicleId(id);
    }

}
