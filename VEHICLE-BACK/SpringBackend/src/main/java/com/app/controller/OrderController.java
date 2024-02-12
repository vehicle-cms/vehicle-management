package com.app.controller;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderDTO;
import com.app.service.OrderService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/user/order")
@CrossOrigin(originPatterns = "http://localhost:*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<OrderDTO> listAllOrders() {
        return orderService.findOrders();
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
    public OrderDTO createOrder(@RequestBody OrderDTO order) {
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
}
