package com.mangement.demo.entity;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class BANAN_MONAN {
	@EmbeddedId
	private Table_Dish_ID id;
	
	@JsonFormat(pattern = "dd-MMM-YYYY HH:mm")
	@Column(name = "tg_goi")
	private Date call_time;
	
	@Column(name = "suat_an")
	private int call_number;
	
	
	public Table_Dish_ID getId() {
		return id;
	}

	public void setId(Table_Dish_ID id) {
		this.id = id;
	}

	public Date getCall_time() {
		return call_time;
	}

	public void setCall_time(Date call_time) {
		this.call_time = call_time;
	}

	public int getCall_number() {
		return call_number;
	}

	public void setCall_number(int call_number) {
		this.call_number = call_number;
	}


}
