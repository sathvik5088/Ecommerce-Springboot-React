package com.WebApp.orders.Service;

import com.WebApp.orders.Model.Orders;
import com.WebApp.orders.Repository.OrdersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepo ordersRepo;

    public List<Orders> getAllOrders() {
        return ordersRepo.findAll();
    }


    public List<Orders> getOrdersByUser(String email) {
        return ordersRepo.findByUserEmail(email);
    }


    public Orders placeOrder(Orders order) {
        return ordersRepo.save(order);
    }

    public void deleteOrder(int id){
        ordersRepo.deleteById(id);
    }
}
