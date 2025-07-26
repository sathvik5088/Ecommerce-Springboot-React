package com.WebApp.purchaseservice.Repository;
import com.WebApp.purchaseservice.Model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PurchaseRepo extends JpaRepository<Purchase,Integer>{

    List<Purchase> findByUserEmail(String userEmail);

}