package com.mangement.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import com.mangement.demo.DAO.*;
import com.mangement.demo.entity.*;
@Service
@Transactional
public class TableService {
	@Autowired
    private TableManagement tableManagement;
	
	public List<BAN_AN> getAllTable(){
		return tableManagement.findAll();
	}
	
	public Optional<BAN_AN> getTable(String tableName){
		return tableManagement.findById(tableName);
	}
	
	public void addTable(BAN_AN table) {
		tableManagement.save(table);
	}
	
	public boolean modifyTable(BAN_AN table, String tableName) {
		if(getTable(tableName).isPresent()) {
			addTable(table);return true;
		}else return false;
	}
	
	public boolean deleteTable(String tableName) {
		if(getTable(tableName).isPresent()) {
			tableManagement.deleteById(tableName);
			return true;
		}else return false;
	}
     
}

