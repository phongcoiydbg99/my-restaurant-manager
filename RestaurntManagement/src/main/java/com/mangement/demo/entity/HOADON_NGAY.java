package com.mangement.demo.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.*;
@Entity
public class HOADON_NGAY {
	@Id
	@Column(name = "ma_hoadon")
    private Long id;
    
	@Column(name = "ban_an")
    private String table;
    
	@Column(name = "danhsach_mon")
    private String dishList;
    
	@Column(name = "thanhtien")
    private long money;
    
	@JsonFormat(pattern = "dd-MMM-YYYY HH:mm:ss")
	@Column(name = "ngaygio_thanhtoan")
    private Date pay_time;
	
    public long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTable() {
		return table;
	}

	public void setTable(String table) {
		this.table = table;
	}

	public String getDishList() {
		return dishList;
	}

	public void setDishList(String dishList) {
		this.dishList = dishList;
	}

	public long getMoney() {
		return money;
	}

	public void setMoney(Long money) {
		this.money = money;
	}

	public Date getPay_time() {
		return pay_time;
	}

	public void setPay_time(Date pay_time) {
		this.pay_time = pay_time;
	}

	
}
