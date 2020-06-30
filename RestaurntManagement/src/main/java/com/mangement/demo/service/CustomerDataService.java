package com.mangement.demo.service;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;
import com.mangement.demo.DAO.*;
import com.mangement.demo.entity.*;
@Service
@Transactional
public class CustomerDataService {
	@Autowired
	private CustomerDataManagement customerDataManagement;

	public List<CUSTOMER_DATA> getAll(){
	   	return customerDataManagement.findAll();
	    }
	    
	    public Optional<CUSTOMER_DATA> getMonthData(String month){
	   	 return customerDataManagement.findById(month);
	    }
}
