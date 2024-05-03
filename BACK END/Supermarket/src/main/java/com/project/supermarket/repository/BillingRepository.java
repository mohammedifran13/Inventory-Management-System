package com.project.supermarket.repository;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.supermarket.entity.Billing;
@EnableAutoConfiguration
@EntityScan(basePackages = "com.project.supermarket.entity")
public interface BillingRepository extends JpaRepository<Billing, Long> {

}
