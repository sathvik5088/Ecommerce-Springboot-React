
package com.WebApp.purchaseservice.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.WebApp.purchaseservice.Model.Purchase;
import com.WebApp.purchaseservice.Service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase")
@CrossOrigin
public class PurchaseController{

    @Autowired
    private PurchaseService purchaseService;

    @GetMapping
    public List<Purchase> getAllPurchase(@RequestParam String userEmail){
        return purchaseService.getAllPurchase(userEmail);
    }

    @PostMapping("/item")
    public ResponseEntity<Purchase> initiatePurchase(@RequestBody Purchase purchase) {
        Purchase savedPurchase = purchaseService.initiatePurchase(
                purchase.getOrderId(),
                purchase.getAmount(),
                purchase.getMethod(),
                purchase.getUserEmail(),
                purchase.getproductName(),
                purchase.getQuantity()
        );

        return ResponseEntity.ok(savedPurchase);
    }


    @DeleteMapping("/{prodId}")
    public void deletePurchase(@PathVariable int prodId){
        purchaseService.deletePurchase(prodId);
    }


}