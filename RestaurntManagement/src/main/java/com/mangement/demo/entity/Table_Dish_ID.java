package com.mangement.demo.entity;

import java.io.Serializable;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mangement.demo.entity.*;
import javax.persistence.*;
@Embeddable
public class Table_Dish_ID implements Serializable {
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "ten_ban")
    private BAN_AN table;
	
	@ManyToOne
	@JoinColumn(name = "ten_mon")
    private MON_AN dish;
     
	public void setTable(BAN_AN table) {
		this.table = table;
	}

	public void setDish(MON_AN dish) {
		this.dish = dish;
	}
	
	public BAN_AN getTable() {
		return table;
	}

	public MON_AN getDish() {
		return dish;
	}
	
	public Table_Dish_ID() {
		
	}
	
	public Table_Dish_ID(BAN_AN table, MON_AN dish) {
		this.table = table; this.dish = dish;
	}

	@Override
	public boolean equals(Object o) {
		if(this == o) return true;
		if(!(o instanceof Table_Dish_ID)) return false;
		Table_Dish_ID that = (Table_Dish_ID) o;
		return Objects.equals(that.getTable(), getTable()) &&  Objects.equals(that.getDish(), getDish());
	}

	
}
