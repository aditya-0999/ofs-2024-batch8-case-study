package com.ofss.main.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ofss.main.domain.Customer;
import com.ofss.main.domain.Login;
import com.ofss.main.repository.CustomerRepository;
import com.ofss.main.repository.LoginRepository;
@Service
public class CustomerServiceImpl implements CustomerService{

	
	@Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private LoginRepository loginRepository;
	@Override
	public Customer addNewCustomer(Customer customer) {
		
		Login login = customer.getLogin();
        // Save the login entity first if it's transient (new)
        if (login != null && login.getLoginId() == 0) {
            login = loginRepository.save(login);
            customer.setLogin(login);
        }
        // Save the customer entity
        return customerRepository.save(customer);
//        return true;
	}
	
//	@Override
//	public Customer fetchCustomerDetails(Customer customer) {
//		return null;
//	}

	@Override
	public Customer getCustomerByLogin(Login login) {
		Optional<Login> loginOptional = loginRepository.findById(login.getLoginId());
		   
	    if (loginOptional.isPresent()) {
	        // If the login exists, retrieve the customer associated with this login
	    	Login Userlogin = loginOptional.get();
	    	Customer customerDetails = null;
	        if(Userlogin.getPassword().equals(login.getPassword()))
	        	customerDetails = customerRepository.findByLogin(login);
//	        Customer customerDetails = 
	       
	        if (customerDetails != null) {
	            return customerDetails;
	        }
	    }
	   
	    // If loginId is not found or customer is not found, return null
	    return null;
	}

}
