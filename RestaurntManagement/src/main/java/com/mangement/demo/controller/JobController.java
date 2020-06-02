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
@RequestMapping("/job")
public class JobController {
    @Autowired
    private JobService jobService;
    
    @GetMapping("/all")
    public ResponseEntity<List<CHUCVU>> getAllJob(){
    	return new ResponseEntity<List<CHUCVU>>(jobService.getAllJob(),HttpStatus.OK);
    }
    @GetMapping("/{name}")
    public ResponseEntity<?> getJobByNamme(@PathVariable("name") String name){
    	Optional<CHUCVU> ojob = jobService.getJobByNamme(name);
        if(ojob.isPresent()) {
        	return new ResponseEntity<CHUCVU> (ojob.get(),HttpStatus.OK);
        }else return new ResponseEntity<String>("No job found", HttpStatus.NOT_FOUND);
    }
    
    @PostMapping("/add")//ham nay them thong tin 1 nhan vien gan voi 1 account trc do
	 public ResponseEntity<?>  addJob(@RequestBody CHUCVU job){
    	jobService.addJob(job);
		return new ResponseEntity<String>("Job added",HttpStatus.OK);
		
	}
    
    @PutMapping("/modify/{name}")
    public ResponseEntity<?> modifyJob(@PathVariable("name") String name, @RequestBody CHUCVU job){
    	
        if(jobService.updateJob(job, name)) {
        	return new ResponseEntity<String> ("Job updated",HttpStatus.OK);
        }else return new ResponseEntity<String>("No job found", HttpStatus.NOT_FOUND);
    }
    
    @DeleteMapping("/delete/{name}")
    public ResponseEntity<?> deleteJob(@PathVariable("name") String name){
    	
        if(jobService.delJob( name)) {
        	return new ResponseEntity<String> ("Job deleted",HttpStatus.OK);
        }else return new ResponseEntity<String>("No job found", HttpStatus.NOT_FOUND);
    }
}
