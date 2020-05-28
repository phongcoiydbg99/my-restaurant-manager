package com.mangement.demo.entity;
import java.util.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
@Entity
public class BAN_AN {
     @Id
     @Column(name = "ten_ban")
     private String name;
     
     
     @Column(name = "soluong_ghe")
     private int chairNum;
     
     @Column(name = "trang_thai")
     private String status;
     
     @Column(name = "gia_ban")
     private long price;
     
     @Column(name = "ten_day_du")
     private String fullName;
     
     public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	@JsonFormat(pattern = "dd-MMM-YYYY HH:mm")
     @Column(name = "reserved_time" , nullable = true)
     private Date reserve_time;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getChairNum() {
		return chairNum;
	}

	public void setChairNum(int chairNum) {
		this.chairNum = chairNum;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}

	public Date getReserve_time() {
		return reserve_time;
	}

	public void setReserve_time(Date reserve_time) {
		this.reserve_time = reserve_time;
	}
     
     
}
