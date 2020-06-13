package com.mangement.demo.entity;
import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class DS_DATBAN {
	@Id
	@Column(name = "ma_datban")
    private Long orderId;
	
	@JsonFormat(pattern = "dd-MMM-YYYY HH:mm:ss")
	@Column(name = "reserved_time")
	private Date reservedTime;
	
	@Column(name = "guest_name")
	private String guestName;
	
	@Column(name = "guest_number")
	private Long phoneNum;
	
	@Column(name = "guest_email", nullable = true)
	private String email;
	
	@Column(name = "ten_ban")
	private String tableName;
	
	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Date getReservedTime() {
		return reservedTime;
	}

	public void setReservedTime(Date reservedTime) {
		this.reservedTime = reservedTime;
	}

	public String getGuestName() {
		return guestName;
	}

	public void setGuestName(String guestName) {
		this.guestName = guestName;
	}

	public Long getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum(Long phoneNum) {
		this.phoneNum = phoneNum;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

}
