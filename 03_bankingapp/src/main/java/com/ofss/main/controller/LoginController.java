package com.ofss.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
