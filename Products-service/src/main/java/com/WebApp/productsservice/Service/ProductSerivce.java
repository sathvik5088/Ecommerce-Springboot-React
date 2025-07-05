package com.WebApp.productsservice.Service;

import com.WebApp.productsservice.Model.Product;
import com.WebApp.productsservice.Repository.ProductsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Component
public class ProductSerivce {   

    @Autowired
    public ProductsRepo repo;

//    List<Product> products = new ArrayList<>(Arrays.asList(new Product(101,"iphone", 50000), new Product(102,"Camera", 10000)));

    public List<Product> getProducts(){
//        return products;
        return repo.findAll();
    }

//    public int gettingId(Product prod){
//        int index = 0;
//        for(int i=0; i<products.size();i++){
//            if(products.get(i).getProdId() == prod.getProdId() )
//                index = i;
//        }
//
//        return index;
//    }

    public Product getProductByid(int prodId) {
//        return productsreturn repo.findAll();
        return repo.findById(prodId).orElse(new Product());
    }

    public void addProduct(Product prod){
//        products.add(prod);
        repo.save(prod);
    }

    public void updateProduct(Product prod) {
////        int index = 0;
////        for(int i=0; i<products.size(); i++){
////            if(products.get(i).getProdId() == prod.getProdId())
////                index = i;
////        }
//        products.set(gettingId(prod),prod);
        repo.save(prod);

    }

    public void deleteProduct(int prodId) {
//        int index = 0;
//        for(int i=0; i<products.size();i++){
//            if(products.get(i).getProdId() == prodId)
//                index = i;
//        }
//        products.remove(index);
        repo.deleteById(prodId);
    }
}
