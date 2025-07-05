package com.WebApp.payments.Controller;

import com.WebApp.payments.Model.Payments;
import com.WebApp.payments.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/payments")
@CrossOrigin
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/initiate")
    public ResponseEntity<Payments> initiatePayment(@RequestBody Payments paymentRequest) {
        Payments payment = paymentService.initiatePayment(
                paymentRequest.getOrderId(),
                paymentRequest.getAmount(),
                paymentRequest.getMethod(),
                paymentRequest.getEmail(),
                paymentRequest.getProductName(),
                paymentRequest.getQuantity()
        );
        return ResponseEntity.ok(payment);
    }

    @GetMapping("/users")
    public List<Payments> getPaymentsByUser(@RequestParam String email){
        return paymentService.getPaymentsByUser(email);
    }

}
