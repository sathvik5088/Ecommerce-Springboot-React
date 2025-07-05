package com.WebApp.productsservice.Controller;

import com.WebApp.productsservice.Model.Product;
import com.WebApp.productsservice.Service.ProductSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductsController {

    @Autowired
    private ProductSerivce service;

//    @RequestMapping("/products")
    @GetMapping("/products")
    public List<Product> getProducts(){
        return service.getProducts();
    }


//    @RequestMapping("/products/{prodid}")
    @GetMapping("/products/{prodid}")
    public Product getProductById(@PathVariable int prodid ){

        return service.getProductByid(prodid);
    }

    @PostMapping("/products")
    public void addProduct(@RequestBody Product prod){
        service.addProduct(prod);
    }

    @PutMapping("/products")
    public void updateProduct(@RequestBody Product prod){
        service.updateProduct(prod);
    }
    @DeleteMapping("/products/{prodId}")
    public void deleteProduct(@PathVariable int prodId){

        service.deleteProduct(prodId);

    }
}



// By default, all the methods will be GET method.