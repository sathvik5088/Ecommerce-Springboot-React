package com.WebApp.purchaseservice.Service;

import com.WebApp.purchaseservice.Model.Purchase;
import com.WebApp.purchaseservice.Repository.PurchaseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepo purchaseRepo;

    public List<Purchase> getAllPurchase(String userEmail) {
        return purchaseRepo.findByUserEmail(userEmail);
    }

    public void deletePurchase(int prodId) {
        purchaseRepo.deleteById(prodId);
    }

    public Purchase initiatePurchase(String orderId, double amount, String method, String userEmail, String productName, int quantity) {
        Purchase purchase = new Purchase();
        purchase.setOrderId(orderId);
        purchase.setAmount(amount);
        purchase.setMethod(method);
        purchase.setUserEmail(userEmail);
        purchase.setproductName(productName);
        purchase.setQuantity(quantity);
        purchase.setPurchasedAt(java.time.LocalDateTime.now());
        return purchaseRepo.save(purchase);
    }
}
