package com.mangement.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mangement.demo.service.*;
import com.mangement.demo.entity.*;
import java.util.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:19002", "http://localhost:19001"})
@RestController
@RequestMapping("/dishdata")
public class DishDataController {
	@Autowired
	private DishDataService dishDataService;
	
	@GetMapping("/all")
    public ResponseEntity<List<DISH_DATA>> getDishData(){
    	return new ResponseEntity<List<DISH_DATA>>(dishDataService.getAll(),HttpStatus.OK);
    }
	
	@GetMapping("/{name}")
    public ResponseEntity<?> getMonthlyRevenue(@PathVariable("name") String name){
    	Optional<DISH_DATA> ojob = dishDataService.getDish(name);
        if(ojob.isPresent()) {
        	return new ResponseEntity<DISH_DATA> (ojob.get(),HttpStatus.OK);
        }else return new ResponseEntity<String>("Month found", HttpStatus.NOT_FOUND);
    }
	
	 @PutMapping("/modify/{name}")//sua data cua 1 mon an
	    public ResponseEntity<?> modifyRevenue(@PathVariable("name") String name, @RequestBody DISH_DATA data){
	    	
	        if(dishDataService.modifyDish(data, name)) {
	        	return new ResponseEntity<String> ("Data  updated",HttpStatus.OK);
	        }else return new ResponseEntity<String>("Dish not found", HttpStatus.NOT_FOUND);
	    }

}
