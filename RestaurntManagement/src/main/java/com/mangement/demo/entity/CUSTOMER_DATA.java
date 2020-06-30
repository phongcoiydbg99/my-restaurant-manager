package com.mangement.demo.entity;

import javax.persistence.*;
@Entity
public class CUSTOMER_DATA {
	@Id
	@Column(name = "month_name")
    private String month;
    
	@Column(name = "sluong")
    private int amount;
	
	
    public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	
}
