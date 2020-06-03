package com.mangement.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import com.mangement.demo.DAO.*;
import com.mangement.demo.entity.*;
@Service
@Transactional
public class DayRevenueService {
    @Autowired
    private DayRevenueManagement dayRevenueManagement;
    
    public List<DAY_REVENUE> getAll(){
    	return dayRevenueManagement.findAll();
     }
     
     public Optional<DAY_REVENUE> getDay(long d){
    	 return dayRevenueManagement.findById(d);
     }
     public boolean modifyDayRevenue(DAY_REVENUE re, long day) {
 		if(getDay(day).isPresent()) {
 			dayRevenueManagement.save(re);
 			return true;
 		}else return false;
 	}
}
