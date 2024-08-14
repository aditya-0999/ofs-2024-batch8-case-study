package com.ofss.main.service;

import com.ofss.main.domain.Customer;
import com.ofss.main.domain.Login;

public interface CustomerService {
	Customer addNewCustomer(Customer customer);
	Customer getCustomerByLogin(Login login);
//	Customer fetchCustomerDetails(Customer customer);
}
