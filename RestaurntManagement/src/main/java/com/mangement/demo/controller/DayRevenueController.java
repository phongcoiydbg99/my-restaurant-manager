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
@RequestMapping("/dayRevenue")
public class DayRevenueController {
    @Autowired
    private DayRevenueService dayRevenueService;
    
    @GetMapping("/all")
    public ResponseEntity<List<DAY_REVENUE>> getYearRevenue(){
    	return new ResponseEntity<List<DAY_REVENUE>>(dayRevenueService.getAll(),HttpStatus.OK);
    }
	
	@GetMapping("/{name}")
    public ResponseEntity<?> getDayRevenue(@PathVariable("name")String d){
    	Optional<DAY_REVENUE> ojob = dayRevenueService.getDay(Long.parseLong(d));
        if(ojob.isPresent()) {
        	return new ResponseEntity<DAY_REVENUE> (ojob.get(),HttpStatus.OK);
        }else return new ResponseEntity<String>("Day not found", HttpStatus.NOT_FOUND);
    }
	
	 @PutMapping("/modify/{name}")
	    public ResponseEntity<?> modifyRevenue(@PathVariable("name") String name, @RequestBody DAY_REVENUE re){
	    	
	        if(dayRevenueService.modifyDayRevenue(re, Long.parseLong(name))) {
	        	return new ResponseEntity<String> ("Revenue updated",HttpStatus.OK);
	        }else return new ResponseEntity<String>("Month not found", HttpStatus.NOT_FOUND);
	    }
}
