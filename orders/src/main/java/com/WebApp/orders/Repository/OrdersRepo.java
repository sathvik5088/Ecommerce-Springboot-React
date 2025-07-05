package com.WebApp.orders.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.WebApp.orders.Model.Orders;

import java.util.List;

public interface OrdersRepo extends JpaRepository<Orders, Integer> {
    List<Orders> findByUserEmail(String email);

}
