package com.mangement.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import com.mangement.demo.DAO.AccManagement;
import com.mangement.demo.entity.TAIKHOAN;

@Service
public class AccountService {
	 @Autowired //lay impl tu DAO
     AccManagement accManagement;
	 public List<TAIKHOAN> getAllAcc(){
		 return this.accManagement.findAll();
	 }//tra ve 1 danh sach cac tai khoan dua vao DAO
	
	 public Optional<TAIKHOAN> getAccByUsername (String name){
		 return this.accManagement.findById(name);
		 //tra ve 1 acc theo username, tra ve null neu k tim thay
	 }
	 
	 public void addAccount(TAIKHOAN tk) {
		 accManagement.save(tk);
	 }
	 
	 public boolean increaseSalary(long sal, String username) {
		 Optional<TAIKHOAN> otk = accManagement.findById(username);
		 if(otk.isPresent()) {
			TAIKHOAN tk = otk.get();
			tk.setSoduTK(tk.getSoduTK() + sal);
			accManagement.save(tk); return true;
		 }else return false;
		  
	 }
	 
	 public boolean delete(String username) {
		 Optional<TAIKHOAN> otk = accManagement.findById(username);
		 if(otk.isPresent()) {
			 accManagement.deleteById(username);return true;
		 }else {
			 return false;
		 }
	 }
      
}
