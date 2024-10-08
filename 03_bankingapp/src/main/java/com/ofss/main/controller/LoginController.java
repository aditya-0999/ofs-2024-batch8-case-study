package com.ofss.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ofss.main.domain.Customer;
import com.ofss.main.domain.Login;
import com.ofss.main.repository.LoginRepository;
import com.ofss.main.service.CustomerService;
import com.ofss.main.service.LoginService;

@RequestMapping("bank")
@RestController
@CrossOrigin(origins ="*")
public class LoginController {

	@Autowired
	private LoginService loginService;
	
	@Autowired
	private CustomerService customerService;
	
	
//	@Override
	@PostMapping("checklogin")
	public ResponseEntity<String> validationOfLogin(@RequestBody Login login) {
		int loginId = login.getLoginId();
				String password = login.getPassword();
		int validationFlag = loginService.validateLogin(loginId, password);
		
		switch (validationFlag) {
        case 1:
            return ResponseEntity.ok("Login successful");
        case -1:
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password incorrect");
        case -2:
            return ResponseEntity.status(HttpStatus.LOCKED).body("Account is blocked");
        case 0:
        default:
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Login ID not found");
    }
}
	
	// this method is used to add customer (Registration)
	// for this we give customer details in body of PostMan
	@PostMapping("/customers")
    public ResponseEntity<?> createCustomer(@RequestBody Customer customer) {
        try {
            Customer createdCustomer = customerService.addNewCustomer(customer);
            if (createdCustomer != null) {
                return ResponseEntity.ok(createdCustomer);
            } else {
                return ResponseEntity.status(400).body("Failed to create customer");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }
	
	@PostMapping("getCustomer")
	public ResponseEntity<?> getCustomerDetails(@RequestBody Login login) {
		Customer customer = customerService.getCustomerByLogin(login);
		
		if (customer != null) {
			return ResponseEntity.ok(customer);
		} else {
		return ResponseEntity.status(400).body("Login");
	}
}
	
	@PutMapping("updatecustomerdetails")
	public ResponseEntity<?> updateCustomerDetails(@RequestBody Customer customer) {
		Customer UpdatedCustomer = customerService.updateCustomerDetails(customer);
		
		if (UpdatedCustomer != null) {
			return ResponseEntity.ok(UpdatedCustomer);
		} else {
		return ResponseEntity.status(400).body("Error occured! check your data");
	}
	}
}