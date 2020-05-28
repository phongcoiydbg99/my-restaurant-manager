package com.mangement.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mangement.demo.DAO.*;
import com.mangement.demo.entity.*;
import java.util.*;

@Service
@Transactional
public class JobService {
	@Autowired
     private JobManagement jobManagement;
	
	public List<CHUCVU> getAllJob(){
		return jobManagement.findAll();
	}
	
	public Optional<CHUCVU> getJobByNamme(String name){
		return jobManagement.findById(name);
	}
	
	public void addJob(CHUCVU job) {
	    jobManagement.save(job);
	}
	
	public boolean delJob(String jobname) {
		Optional<CHUCVU> ojob = jobManagement.findById(jobname);
		if(ojob.isPresent()) {
			jobManagement.deleteById(jobname);
			return true;
		}else return false;
	}
	
	public boolean updateJob(CHUCVU job,String jobname) {
		Optional<CHUCVU> ojob = jobManagement.findById(jobname);
		if(ojob.isPresent()) {
			jobManagement.save(job);
			return true;
		}else return false;
	}
}
