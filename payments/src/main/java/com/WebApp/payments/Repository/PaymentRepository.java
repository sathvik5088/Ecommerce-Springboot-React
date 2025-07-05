package com.WebApp.payments.Repository;

import com.WebApp.payments.Model.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface PaymentRepository extends JpaRepository<Payments, Long> {

    List<Payments> findByemail(String email);
}
