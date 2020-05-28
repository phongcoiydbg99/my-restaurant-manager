package com.mangement.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mangement.demo.service.*;
import com.mangement.demo.entity.*;
import java.util.*;

@CrossOrigin(origins = {"http://localhost:3000","http://10.0.0.2:8080","http://10.0.0.2:3000","http://localhost:19002","http://localhost:19001","http://127.0.0.1:19000"})
@RestController
@RequestMapping("/dish")
public class DishController {
	@Autowired
    private DishService dishService;
	
	@GetMapping("/all")
    public ResponseEntity<List<MON_AN>> getAllDish(){
    	return new ResponseEntity<List<MON_AN>>(dishService.getAllDish(),HttpStatus.OK);
    }
    @GetMapping("/{name}")
    public ResponseEntity<?> getDishByName(@PathVariable("name") String name){
    	Optional<MON_AN> odish = dishService.getDish(name);
        if(odish.isPresent()) {
        	return new ResponseEntity<MON_AN> (odish.get(),HttpStatus.OK);
        }else return new ResponseEntity<String>("No job found", HttpStatus.NOT_FOUND);
    }
    
    @GetMapping("/category/{name}")
    public ResponseEntity<?> getDishByCategory(@PathVariable("name") String name){
    	List<MON_AN> list = dishService.getByCategory(name);
        if(list.size() > 0) {
        	return new ResponseEntity<List<MON_AN>> (list,HttpStatus.OK);
        }else return new ResponseEntity<String>("No dish found", HttpStatus.NOT_FOUND);
    }
    
    @PostMapping("/add")
	 public ResponseEntity<?>  addDish(@RequestBody MON_AN dish){
   	     dishService.addDish(dish);
		return new ResponseEntity<String>("Dish added",HttpStatus.OK);
		
	}
   
   @PutMapping("/modify/{name}")
   public ResponseEntity<?> modifyDish(@PathVariable("name") String name, @RequestBody MON_AN dish){
   	
       if(dishService.modifyDish(dish, name)) {
       	return new ResponseEntity<String> ("Dish updated",HttpStatus.OK);
       }else return new ResponseEntity<String>("No dish found", HttpStatus.NOT_FOUND);
   }
   
   @DeleteMapping("/delete/{name}")
   public ResponseEntity<?> deleteDish(@PathVariable("name") String name){
   	
       if(dishService.deleteDish( name)) {
       	return new ResponseEntity<String> ("Dish deleted",HttpStatus.OK);
       }else return new ResponseEntity<String>("No dish found", HttpStatus.NOT_FOUND);
   }
}
