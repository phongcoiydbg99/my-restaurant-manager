package com.mangement.demo.entity;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class TAIKHOAN {
	@Id
	@Column(name="username")
    private String username;
	
	@Column(name="pass")
	private String password;
	
	@Column(name="quyenhan")
    private String quyen_han;
	
	@JsonIgnore
    @OneToOne(mappedBy = "tk", cascade = CascadeType.PERSIST)
	private NHANVIEN emp;
	
    
	public NHANVIEN getEmp() {
		return emp;
	}
	public void setEmp(NHANVIEN emp) {
		this.emp = emp;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getQuyen_han() {
		return quyen_han;
	}
	public void setQuyen_han(String quyen_han) {
		this.quyen_han = quyen_han;
	}
	
}
