package com.ofss.main.repository;

import org.springframework.data.repository.CrudRepository;

import com.ofss.main.domain.Account;
import com.ofss.main.domain.Customer;

public interface AccountRepository extends CrudRepository<Account, Integer>{
	Account findByCustomer(Customer customer);
}
