package com.mangement.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import com.mangement.demo.DAO.*;
import com.mangement.demo.entity.*;
@Service
@Transactional
public class RevenueService {
     @Autowired
     private RevenueManagement revenueManagement;
     
     public List<DOANH_THU> getAll(){
    	return revenueManagement.findAll();
     }
     
     public Optional<DOANH_THU> getMonth(String month){
    	 return revenueManagement.findById(month);
     }
     public boolean modifyRevenue(DOANH_THU re, String month) {
 		if(getMonth(month).isPresent()) {
 			revenueManagement.save(re);
 			return true;
 		}else return false;
 	}
     
}
