package com.ofss.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.ofss.main.domain.Customer;
import com.ofss.main.domain.Login;

public interface CustomerRepository extends JpaRepository<Customer, Integer>{

	Customer findByLogin(Login login);
}
