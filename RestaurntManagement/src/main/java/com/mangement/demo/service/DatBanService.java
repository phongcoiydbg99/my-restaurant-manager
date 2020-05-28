package com.mangement.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import com.mangement.demo.DAO.*;
import com.mangement.demo.entity.*;
@Service
@Transactional
public class DatBanService {
    @Autowired
    private DatBanManagement datBanManagement;
    
    public List<DS_DATBAN> getReservedByGuest(String guest){
    	return datBanManagement.findReservedByGuest(guest);
    }
    
    public List<DS_DATBAN> getReservedByPhone(Long phone){
    	return datBanManagement.findReservedByPhone(phone);
    }
    
    public List<DS_DATBAN> getAll(){
    	return datBanManagement.findAll();
    }
    public boolean deleteByGuestName(String guest) {
    	if(getReservedByGuest(guest).size() > 0) {
    		datBanManagement.deleteReservedByTable(guest);
    		return true;
    	}else return false;
    }
    
    public boolean deleteByPhone(Long phone) {
    	if(getReservedByPhone(phone).size() > 0) {
    		datBanManagement.deleteReservedByPhone(phone);
    		return true;
    	}else return false;
    }
    
    public void addReserved(DS_DATBAN reserved) {
    	datBanManagement.save(reserved);
    }
}
