package com.WebApp.productsservice.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @RequestMapping("/")
//    @ResponseBody
    public String greet(){
        return "Welcome to Spring";
    }

    @RequestMapping("/about")
    public String about(){
        return "This is about Spring and Spring Boot 3";
    }
}
