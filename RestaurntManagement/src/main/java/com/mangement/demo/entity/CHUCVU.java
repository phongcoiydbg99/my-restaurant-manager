package com.mangement.demo.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class CHUCVU {
    @Id
    @Column(name = "ten_chucvu")
    private String job_name;
    
	@Column(name = "tg_batdau")
    private String time_start;
    
    @Column(name = "tg_ketthuc")
    private String time_finish;
    
    @Column(name = "luong_thang")
    private long month_sal;
    
    @JsonIgnore
    @OneToOne(mappedBy = "job", cascade = CascadeType.PERSIST)
	private NHANVIEN emp;
    
 
    public NHANVIEN getEmp() {
		return emp;
	}

	public void setEmp(NHANVIEN emp) {
		this.emp = emp;
	}

	public String getJob_name() {
		return job_name;
	}

	public void setJob_name(String job_name) {
		this.job_name = job_name;
	}

	public String getTime_start() {
		return time_start;
	}

	public void setTime_start(String time_start) {
		this.time_start = time_start;
	}

	public String getTime_finish() {
		return time_finish;
	}

	public void setTime_finish(String time_finish) {
		this.time_finish = time_finish;
	}

	public long getMonth_sal() {
		return month_sal;
	}

	public void setMonth_sal(long month_sal) {
		this.month_sal = month_sal;
	}
}
