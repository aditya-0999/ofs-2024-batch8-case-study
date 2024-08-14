package com.ofss.main.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ofss.main.domain.Account;
import com.ofss.main.domain.Customer;
import com.ofss.main.domain.Login;
import com.ofss.main.service.AccountService;
import com.ofss.main.service.CustomerService;
import com.ofss.main.service.LoginService;
import org.springframework.web.bind.annotation.RequestParam;
@RequestMapping("bank")
@CrossOrigin(origins = "*")
@RestController
public class AccountController {
	
	@Autowired
	AccountService accountService;
	
	@PostMapping("getaccountdetails")
	public ResponseEntity<?> postMethodName(@RequestBody Login login) {
		//TODO: process POST request
		Account account = accountService.getAccountByCustomer(login);
		if (account != null) {
            return ResponseEntity.ok(account);
        } else {
            return ResponseEntity.status(400).body("Login ID/Password/Account dosnt exists");
        }
	}
	
}






