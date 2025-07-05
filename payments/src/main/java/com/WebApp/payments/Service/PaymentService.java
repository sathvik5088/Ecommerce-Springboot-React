package com.WebApp.payments.Service;

import com.WebApp.payments.Model.Payments;

import java.util.List;


public interface PaymentService {
    Payments initiatePayment(String orderId, Double amount, String method, String email,String productName, int quantity);

    List<Payments> getPaymentsByUser(String email);
}
