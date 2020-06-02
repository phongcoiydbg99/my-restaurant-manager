package com.mangement.demo.service;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import com.mangement.demo.DAO.*;
import com.mangement.demo.entity.*;

@Service
@Transactional
public class Table_Dish_Service {
	@Autowired
    private Table_Dish_Management table_Dish_Management;
	
	@Autowired
	private DishManagement dishManagement;
	
	@Autowired 
	private TableManagement tableManagement;
	
	public List<BANAN_MONAN> getAllList(){
		return table_Dish_Management.findAll();
	}
	
	public List<BANAN_MONAN> getListByTable(String tableName){
		return table_Dish_Management.findTableByTableName(tableName);
	}
	
	public boolean addOrder(BANAN_MONAN order, String tableName, String dishName) {
		Optional<BAN_AN> table = tableManagement.findById(tableName);
	    Optional<MON_AN> dish = dishManagement.findById(dishName);
	    if(!table.isPresent() || !dish.isPresent()) return false;
	    Table_Dish_ID tid = new Table_Dish_ID(table.get(),dish.get());
	    order.setId(tid);
	    table_Dish_Management.save(order);
	    return true;
	}
	
	public boolean deleteTable(String tableName) {
		List<BANAN_MONAN> list = getListByTable(tableName);
		if(list.size() == 0) return false;
		table_Dish_Management.deleteTableByTableName(tableName);
		return true;
	}
}
