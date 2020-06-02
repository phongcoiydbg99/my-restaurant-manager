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
@RequestMapping("/revenue")
public class RevenueController {
	@Autowired
    private RevenueService revenueService;
	
	@GetMapping("/all")
    public ResponseEntity<List<DOANH_THU>> getYearRevenue(){
    	return new ResponseEntity<List<DOANH_THU>>(revenueService.getAll(),HttpStatus.OK);
    }
	
	@GetMapping("/{name}")
    public ResponseEntity<?> getMonthlyRevenue(@PathVariable("name") String name){
    	Optional<DOANH_THU> ojob = revenueService.getMonth(name);
        if(ojob.isPresent()) {
        	return new ResponseEntity<DOANH_THU> (ojob.get(),HttpStatus.OK);
        }else return new ResponseEntity<String>("Month not found", HttpStatus.NOT_FOUND);
    }
	
	 @PutMapping("/modify/{name}")
	    public ResponseEntity<?> modifyRevenue(@PathVariable("name") String name, @RequestBody DOANH_THU re){
	    	
	        if(revenueService.modifyRevenue(re, name)) {
	        	return new ResponseEntity<String> ("Revenue updated",HttpStatus.OK);
	        }else return new ResponseEntity<String>("Month not found", HttpStatus.NOT_FOUND);
	    }
}
