package com.mangement.demo.entity;

import javax.persistence.*;

@Entity
public class DISH_DATA {
   @Id
   @Column(name = "ten_mon")
	private String dishName;
	
  

	@Column(name = "January")
    private int January;
    
    @Column(name = "February")
    private int February;
    
    @Column(name = "March")
    private int March;
    
    @Column(name = "April")
    private int April;
    
    @Column(name = "May")
    private int May;
    
    @Column(name = "June")
    private int June;
    
    @Column(name = "July")
    private int July;
    
    @Column(name = "August")
    private int August;
    
    @Column(name = "September")
    private int September;
    
    @Column(name = "October")
    private int October;
    
    @Column(name = "November")
    private int November;
    
    @Column(name = "December")
    private int December;
    
    public String getDishName() {
    	return dishName;
    }
    public void setDishName(String dishName) {
    	this.dishName = dishName;
    }
    
    public int getJanuary() {
		return January;
	}
	public void setJanuary(int january) {
		January = january;
	}

	public int getFebruary() {
		return February;
	}

	public void setFebruary(int february) {
		February = february;
	}

	public int getMarch() {
		return March;
	}

	public void setMarch(int march) {
		March = march;
	}

	public int getApril() {
		return April;
	}

	public void setApril(int april) {
		April = april;
	}

	public int getMay() {
		return May;
	}

	public void setMay(int may) {
		May = may;
	}

	public int getJune() {
		return June;
	}

	public void setJune(int june) {
		June = june;
	}

	public int getJuly() {
		return July;
	}

	public void setJuly(int july) {
		July = july;
	}

	public int getAugust() {
		return August;
	}

	public void setAugust(int august) {
		August = august;
	}

	public int getSeptember() {
		return September;
	}

	public void setSeptember(int september) {
		September = september;
	}

	public int getOctober() {
		return October;
	}

	public void setOctober(int october) {
		October = october;
	}

	public int getNovember() {
		return November;
	}

	public void setNovember(int november) {
		November = november;
	}

	public int getDecember() {
		return December;
	}

	public void setDecember(int december) {
		December = december;
	}

	
}
