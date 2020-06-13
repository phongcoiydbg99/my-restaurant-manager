package com.mangement.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mangement.demo.service.*;
import com.mangement.demo.entity.*;
import java.util.*;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:19002", "http://localhost:19001"})
@RestController
@RequestMapping("/bill")
public class HoaDonController {
	@Autowired
   private HoaDonService hoaDonService;
	
	@GetMapping("/all")
    public ResponseEntity<List<HOADON_NGAY>> getYearRevenue(){
    	return new ResponseEntity<List<HOADON_NGAY>>(hoaDonService.getBill(),HttpStatus.OK);
    }
}
