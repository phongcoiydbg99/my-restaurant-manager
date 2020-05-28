package com.mangement.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import com.mangement.demo.DAO.*;
import com.mangement.demo.entity.*;

@Service
@Transactional
public class EmpService {
	@Autowired
    private EmpManagement empManagement;
	
	@Autowired
	private JobManagement jobManagement;
	
	public List<NHANVIEN> getAllEmp(){
		 return empManagement.findAll();
	 }
	
	public List<NHANVIEN> getEmpByName (String name){
		 return empManagement.findByName(name);
		 //tra ve 1 nhanvien theo id tra ve null neu k tim thay
	 }
	
	 public void addEmp (NHANVIEN nv, String jobName) {
		 jobManagement.findById(jobName).map(job ->{
			 nv.setJob(job);
			 return empManagement.save(nv);
		 });
          
      }

     public boolean modifyEmpByName(NHANVIEN nv, String name) {
         List<NHANVIEN> emp = empManagement.findByName(name);
         if(emp.size() == 1) {
        	 CHUCVU job = emp.get(0).getJob();
        	 nv.setJob(job);
	        empManagement.save(nv);
	        return true;
          }else return false;
      }

      public boolean deleteEmpByName(String name) {
           List<NHANVIEN> otk = empManagement.findByName(name);
           if(otk.size() == 1) {
        	   
	             empManagement.deleteEmpByName(name);return true;
           }else return false;
        }	
}
