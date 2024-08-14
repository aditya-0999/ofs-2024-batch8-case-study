package com.ofss.main.service;

import org.springframework.stereotype.Service;

import com.ofss.main.domain.Account;
import com.ofss.main.domain.Login;
@Service
public interface AccountService {
	Account getAccountByCustomer(Login login);
}
