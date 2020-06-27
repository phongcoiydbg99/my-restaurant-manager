package com.mangement.demo.entity;
import javax.persistence.*;
import java.util.Date;
import com.fasterxml.jackson.annotation.*;

@Entity
public class NHANVIEN {
	 @Id
	 @Column(name = "MANV")
     private String maNV;
	 
	 @JsonIgnore
	 @OneToOne(fetch = FetchType.EAGER)
	 @JoinColumn(name = "chuc_vu",nullable =false, referencedColumnName = "ten_chucvu")
	 private CHUCVU job;
	 
	public CHUCVU getJob() {
		return job;
	}

	public void setJob(CHUCVU job) {
		this.job = job;
	}
	
	@JsonIgnore
	 @OneToOne(fetch = FetchType.EAGER)
	 @JoinColumn(name = "acc",nullable =false, referencedColumnName = "username")
	private TAIKHOAN tk;

	public TAIKHOAN getTk() {
		return tk;
	}

	public void setTk(TAIKHOAN tk) {
		this.tk = tk;
	}

	@Column(name = "hoten")
	 private String hoten;
	 
	@JsonFormat(pattern = "dd-MMM-YYYY")
	 @Column(name = "ngaysinh")
	 private Date ngaysinh;
	 
	 @Column(name = "diachi")
	 private String diachi;
	 
	 @Column(name = "sdt")
	 private long phone;
	 
	 @Column(name = "email")
	 private String email;
	 
	 @Column(name = "tk_nganhang")
	 private long tk_nganhang;
	 
	 @Column(name = "ten_day_du")
	 private String fullName;
	 
	@Column(name = "giolam_thang")
	 private int hourWorked;
	 
	 public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getMaNV() {
			return maNV;
		}

		public void setMaNV(String maNV) {
			this.maNV = maNV;
		}

		public String getHoten() {
			return hoten;
		}

		public void setHoten(String hoten) {
			this.hoten = hoten;
		}

		public Date getNgaysinh() {
			return ngaysinh;
		}

		public void setNgaysinh(Date ngaysinh) {
			this.ngaysinh = ngaysinh;
		}

		public String getDiachi() {
			return diachi;
		}

		public void setDiachi(String diachi) {
			this.diachi = diachi;
		}

		public long getPhone() {
			return phone;
		}

		public void setPhone(long phone) {
			this.phone = phone;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public long getTk_nganhang() {
			return tk_nganhang;
		}

		public void setTk_nganhang(long tk_nganhang) {
			this.tk_nganhang = tk_nganhang;
		}

		public int getHourWorked() {
				return hourWorked;
		}

		public void setHourWorked(int hourWorked) {
			this.hourWorked = hourWorked;
		}

     
}
