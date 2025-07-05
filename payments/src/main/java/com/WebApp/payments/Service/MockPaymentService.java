package com.WebApp.payments.Service;

import com.WebApp.payments.Model.Payments;
import com.WebApp.payments.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import com.WebApp.payments.Model.Payments;
import java.util.List;


@Service
public class MockPaymentService implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public Payments initiatePayment(String orderId, Double amount, String method, String email, String productName, int quantity ) {
        Payments payment = new Payments();
        payment.setOrderId(orderId);
        payment.setAmount(amount);
        payment.setEmail(email);
        payment.setStatus("SUCCESS");
        payment.setMethod(method);
        payment.setProductName(productName);
        payment.setQuantity(quantity);
        payment.setCreatedAt(new Date());
        return paymentRepository.save(payment);
    }

    @Override
    public List<Payments> getPaymentsByUser(String email){
        return paymentRepository.findByemail(email);
    }
}
