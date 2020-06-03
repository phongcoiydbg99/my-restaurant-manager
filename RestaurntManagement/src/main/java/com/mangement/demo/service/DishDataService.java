package com.mangement.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import com.mangement.demo.DAO.*;
import com.mangement.demo.entity.*;
@Service
@Transactional
public class DishDataService {
	@Autowired
    private DishDataManagement dishDataManagement;
	

    public List<DISH_DATA> getAll(){
   	return dishDataManagement.findAll();
    }
    
    public Optional<DISH_DATA> getDish(String dishName){
   	 return dishDataManagement.findById(dishName);
    }
    
    public boolean modifyDish(DISH_DATA re, String dish) {
    	//sua thong ke theo tung mon an
		if(getDish(dish).isPresent()) {
			dishDataManagement.save(re);
			return true;
		}else return false;
	}
}
