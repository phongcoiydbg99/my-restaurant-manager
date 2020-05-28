package com.mangement.demo.entity;
import javax.persistence.*;


@Entity
public class TAIKHOAN {
	@Id
	@Column(name="username")
    private String username;
	
	@Column(name="pass")
	private String password;
	
	@Column(name="quyenhan")
    private String quyen_han;
	
	@Column(name="sodutk")
    private long soduTK;
	
    
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
	public long getSoduTK() {
		return soduTK;
	}
	public void setSoduTK(long soduTK) {
		this.soduTK = soduTK;
	}
}
