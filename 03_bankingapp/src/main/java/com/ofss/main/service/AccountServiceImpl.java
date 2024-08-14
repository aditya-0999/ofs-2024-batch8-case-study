package com.ofss.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ofss.main.domain.Account;
import com.ofss.main.domain.Customer;
import com.ofss.main.domain.Login;
import com.ofss.main.repository.AccountRepository;
@Service
public class AccountServiceImpl implements AccountService{

	
	@Autowired
	CustomerService customerService;
	
	@Autowired
	AccountRepository accountRepository;
	
	@Override
	public Account getAccountByCustomer(Login login) {
		Customer customer = customerService.getCustomerByLogin(login);
		Account account = accountRepository.findByCustomer(customer);
		if(account != null)
		{
			account.setCustomer(null);
			return account;
		}
		
		return null;
		
	}
}
