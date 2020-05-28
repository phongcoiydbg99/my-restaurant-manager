package com.mangement.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import com.mangement.demo.DAO.*;
import com.mangement.demo.entity.*;
@Service
@Transactional
public class DishService {
	@Autowired
    private DishManagement dishManagement;
	
	public List<MON_AN> getAllDish(){
		return dishManagement.findAll();
	}
	
	public Optional<MON_AN> getDish(String dishName){
		return dishManagement.findById(dishName);
	}
	
	public List<MON_AN> getByCategory(String category){
		return dishManagement.getDishByCategory(category);
	}
	
	public void addDish(MON_AN dish) {
		dishManagement.save(dish);
	}
	
	public boolean modifyDish(MON_AN dish, String dishName) {
		if(getDish(dishName).isPresent()) {
			addDish(dish);return true;
		}else return false;
	}
	
	public boolean deleteDish(String dishName) {
		if(getDish(dishName).isPresent()) {
			dishManagement.deleteById(dishName);
			return true;
		}else return false;
	}
     
}
