package com.ofss.main;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ofss.main.domain.Account;
import com.ofss.main.domain.Customer;
import com.ofss.main.domain.Login;
import com.ofss.main.service.AccountService;
import com.ofss.main.service.CustomerService;

@SpringBootTest
class ApplicationTests {

	
	
	@Autowired
	CustomerService customerService;
	
	@Autowired
	AccountService accountService;
	
	@Test
	void contextLoads() {
	}
	
	@Test
	void checkByLoginId()
	{
		Login login = new Login(1, "Bahubali@123", 0, null);
		Customer customer = customerService.getCustomerByLogin(login);
		System.out.println(customer);
		System.out.println();
		Account account = accountService.getAccountByCustomer(login);
		System.out.println(account);
	}
	
	@Test
	void newCheck() 
	{
		Login login = new Login(24, "nobita", 0, null);
		Customer customer = customerService.getCustomerByLogin(login);
		sys
		customer.setGender("female");
		System.out.println(customerService.updateCustomerDetails(customer));
	}
}
