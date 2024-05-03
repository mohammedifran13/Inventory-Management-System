package com.project.supermarket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.supermarket.entity.Billing;
import com.project.supermarket.service.BillingService;

@CrossOrigin
@RestController
public class BillingController {
    @Autowired
    private BillingService ser;

    @PostMapping("/postPay")
    private  String SaveDetailsRequest(@RequestBody List<Billing> billingList) {
         ser.saveDetails(billingList);
         return "Saved details in billing list.";
    }
}
