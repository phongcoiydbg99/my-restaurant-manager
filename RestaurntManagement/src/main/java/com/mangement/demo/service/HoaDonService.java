package com.mangement.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;
import com.mangement.demo.DAO.*;
import com.mangement.demo.entity.*;
@Service
@Transactional
public class HoaDonService {
	@Autowired
    private HoaDonManagement hoaDonManagement;
	
	public List<HOADON_NGAY> getBill(){
		return hoaDonManagement.findAll();
	}
}
