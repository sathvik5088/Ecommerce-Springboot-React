package com.WebApp.orders.Controller;

import com.WebApp.orders.Model.Orders;
import com.WebApp.orders.Service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @GetMapping
    public List<Orders> getAllOrders() {
        return ordersService.getAllOrders();
    }

    @GetMapping("/user")
    public List<Orders> getOrdersByUser(@RequestParam String email) {
        return ordersService.getOrdersByUser(email);
    }

    @PostMapping
    public Orders placeOrder(@RequestBody Orders order) {
        return ordersService.placeOrder(order);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable int id){
        ordersService.deleteOrder(id);
    }
}
