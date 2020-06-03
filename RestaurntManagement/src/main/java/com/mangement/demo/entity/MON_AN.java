package com.mangement.demo.entity;


import javax.persistence.*;

@Entity
public class MON_AN {
	@Id
	@Column(name = "ten_mon")
    private String name;
	
	@Column(name = "gia")
	private Long pirce;
	
	@Column(name = "mo_ta" , nullable = true)
	private String description;
	
	@Column(name = "sl_dat_thang")
	private int orderTime;
	
	@Column(name = "ten_day_du")
    private String fullName;
     
	@Column(name = "loai_thucan")
	private String foodCategory;
	
	
    public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getPirce() {
		return pirce;
	}

	public void setPirce(Long pirce) {
		this.pirce = pirce;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(int orderTime) {
		this.orderTime = orderTime;
	}

	public String getFoodCategory() {
		return foodCategory;
	}

	public void setFoodCategory(String foodCategory) {
		this.foodCategory = foodCategory;
	}

	
}
