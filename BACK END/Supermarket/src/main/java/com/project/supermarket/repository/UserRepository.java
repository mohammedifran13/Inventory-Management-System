package com.project.supermarket.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.project.supermarket.entity.User;

public interface UserRepository extends JpaRepository<User,Integer>{
	
}