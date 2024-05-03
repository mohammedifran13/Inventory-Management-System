package com.project.supermarket.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.supermarket.entity.Billing;
import com.project.supermarket.repository.BillingRepository;

@Service
public class BillingService {

    @Autowired
    private final BillingRepository repo;

    public BillingService(BillingRepository repo) {
        this.repo = repo;
    }

    public String saveDetails(List<Billing> billingList) {
         repo.saveAll(billingList);
         return "Saved details in billing list.";
    }
}
