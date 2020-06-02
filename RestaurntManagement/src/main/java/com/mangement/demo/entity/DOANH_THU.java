package com.mangement.demo.entity;
import javax.persistence.*;
@Entity
public class DOANH_THU {
	@Id
    @Column(name = "thang")
	private String month;
    
    @Column(name = "doanh_thu")
    private long money;
    
    public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public long getMoney() {
		return money;
	}

	public void setMoney(long money) {
		this.money = money;
	}

	
}
