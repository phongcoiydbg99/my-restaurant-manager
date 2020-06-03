package com.mangement.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mangement.demo.service.*;
import com.mangement.demo.entity.*;
import java.util.*;

@CrossOrigin(origins = {"http://localhost:3000","http://i9-wqj.anonymous.my-restaurant-manager-master.exp.direct:80","http://localhost:19002","http://localhost:19001","http://192.168.43.25:19000"})
@RestController
@RequestMapping("/reserved")
public class DatBanController {
	@Autowired
    private DatBanService datBanService;
	
	@GetMapping("/all")
    public ResponseEntity<List<DS_DATBAN>> getAllReserved(){
    	return new ResponseEntity<List<DS_DATBAN>>(datBanService.getAll(),HttpStatus.OK);
    }
	
	 @GetMapping("/guest/{name}")
	    public ResponseEntity<?> getReservedByName(@PathVariable("name") String name){
	    	List<DS_DATBAN> list = datBanService.getReservedByGuest(name);
	        if(list.size() >0 ) {
	        	return new ResponseEntity<List<DS_DATBAN>> (list,HttpStatus.OK);
	        }else return new ResponseEntity<String>("No reserved found", HttpStatus.NOT_FOUND);
	  }
	 
	 @GetMapping("/phone/{num}")
	    public ResponseEntity<?> getReservedByPhone(@PathVariable("num") Long phone){
	    	List<DS_DATBAN> list = datBanService.getReservedByPhone(phone);
	        if(list.size() >0 ) {
	        	return new ResponseEntity<List<DS_DATBAN>> (list,HttpStatus.OK);
	        }else return new ResponseEntity<String>("No reserved found", HttpStatus.NOT_FOUND);
	  }
	 
	 @PostMapping("/add")
	 public ResponseEntity<String> addReserved(@RequestBody DS_DATBAN reserved){
		 datBanService.addReserved(reserved);
		 return new ResponseEntity<String> ("Reserved added",HttpStatus.OK);
	 }
	 @DeleteMapping("/guest/{name}")
	    public ResponseEntity<?> deleteReservedByName(@PathVariable("name") String name){
	    	
	        if(datBanService.deleteByGuestName(name)) {
	        	return new ResponseEntity<String> ("Reserved deleted",HttpStatus.OK);
	        }else return new ResponseEntity<String>("No reserved found", HttpStatus.NOT_FOUND);
	  }
	  
	 @DeleteMapping("/phone/{name}")
	    public ResponseEntity<?> deleteReservedByPhone(@PathVariable("name") Long name){
	    	
	        if(datBanService.deleteByPhone(name)) {
	        	return new ResponseEntity<String> ("Reserved deleted",HttpStatus.OK);
	        }else return new ResponseEntity<String>("No reserved found", HttpStatus.NOT_FOUND);
	  }
	 
	
}
