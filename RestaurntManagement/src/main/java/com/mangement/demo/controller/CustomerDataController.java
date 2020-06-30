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
@RequestMapping("/customerdata")
public class CustomerDataController {
	@Autowired
    private CustomerDataService customerDataService;
	
	@GetMapping("/all")
    public ResponseEntity<List<CUSTOMER_DATA>> getYearData(){
    	return new ResponseEntity<List<CUSTOMER_DATA>>(customerDataService.getAll(),HttpStatus.OK);
    }
	
	@GetMapping("/{name}")//goi theo thang
    public ResponseEntity<?> getMonthData(@PathVariable("name") String month){
    	Optional<CUSTOMER_DATA> ojob = customerDataService.getMonthData(month);
        if(ojob.isPresent()) {
        	return new ResponseEntity<CUSTOMER_DATA> (ojob.get(),HttpStatus.OK);
        }else return new ResponseEntity<String>("Month not found", HttpStatus.NOT_FOUND);
    }
}
