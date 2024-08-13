package com.ofss.main.repository;

import org.springframework.data.repository.CrudRepository;

import com.ofss.main.domain.Login;

public interface LoginRepository extends CrudRepository<Login, Integer>{
	
}
