package com.app.controller;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Order1DTO;
import com.app.dto.OrderDTO;
import com.app.entities.Orders;
import com.app.service.OrderService;


@RestController
@RequestMapping("/user/order")
@CrossOrigin(originPatterns = "http://localhost:*")
public class OrdersController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<OrderDTO> listAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/ordersBetweenDates")
    public ResponseEntity<?> getOrdersBetweenDates(
            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
    	 List<OrderDTO> orders =  orderService.getOrderBetweenDate(startDate, endDate);
    	  return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public OrderDTO getOrderDetails(@PathVariable @NotNull Long orderId) {
        return orderService.findByOrderId(orderId);
    }

    @GetMapping("/paginate")
    public ResponseEntity<?> getAllOrdersPaginated(
            @RequestParam(defaultValue = "0", required = false) int pageNumber,
            @RequestParam(defaultValue = "10", required = false) int pageSize) {

        List<OrderDTO> orderlist = orderService.getAllOrdersPaginated(pageNumber, pageSize);
        if (orderlist.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(orderlist);
    }

    @PostMapping
    public Orders createOrder(@RequestBody Orders order) {
        return orderService.createOrder(order);
    }

    @PutMapping
    public OrderDTO updateOrder(@RequestBody OrderDTO detachedOrder) {
        return orderService.updateOrder(detachedOrder);
    }

    @DeleteMapping("/{orderId}")
    public String deleteOrder(@PathVariable Long orderId) {
        return orderService.deleteOrder(orderId);
    }
    
    @GetMapping("/order-count")
    public ResponseEntity<?> orderCount() {
    	long count = orderService.orderCount(); 
    	return ResponseEntity.ok(count);
    }
    
    @GetMapping("/approved-count")
    public ResponseEntity<?> approvedOrderCount() {
    	long count = orderService.countOfApprovedOrders(); 
    	return ResponseEntity.ok(count);
    }
    @GetMapping("/pending-count")
    public ResponseEntity<?> pendingOrderCount() {
    	long count = orderService.countOfPendingOrders(); 
    	return ResponseEntity.ok(count);
    }
    @GetMapping("/rejected-count")
    public ResponseEntity<?> rejectedOrderCount() {
    	long count = orderService.countOfRejectedOrders(); 
    	return ResponseEntity.ok(count);
    }
}
