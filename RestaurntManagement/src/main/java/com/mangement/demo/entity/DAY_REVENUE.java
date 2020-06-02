package com.mangement.demo.entity;
import javax.persistence.*;
@Entity
public class DAY_REVENUE {
    @Id
    @Column(name = "daynum")
    private long dayNum;
    
    @Column(name = "doanh_thu")
    private long revenue; 
    
    public long getDayNum() {
		return dayNum;
	}

	public void setDayNum(long dayNum) {
		this.dayNum = dayNum;
	}

	public long getRevenue() {
		return revenue;
	}

	public void setRevenue(long revenue) {
		this.revenue = revenue;
	}

	
}
