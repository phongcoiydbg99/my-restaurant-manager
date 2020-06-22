package com.mangement.demo.controller;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mangement.demo.entity.TAIKHOAN;
import com.mangement.demo.service.AccountService;
import java.util. *;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:19002", "http://localhost:19001"})
@RestController
@RequestMapping("/account")
public class AccController {
	@Autowired
     AccountService accountService;
	
	@GetMapping("/all")//liet ke danh sach tk
	public ResponseEntity<List<TAIKHOAN>> getAllAcc(){
		return new ResponseEntity<List<TAIKHOAN>>(accountService.getAllAcc(),HttpStatus.OK);
	}
	
	
	@GetMapping("/{user}") //xem thong tin 1 tk
	public ResponseEntity<?> getAcc(@PathVariable("user") String name){
		Optional<TAIKHOAN> tk = accountService.getAccByUsername(name);
		if(tk.isPresent()) {
			return  new ResponseEntity<TAIKHOAN>(tk.get(),HttpStatus.OK);
		}else return new ResponseEntity<String>("Not found employee",HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/addAccount")
	public ResponseEntity<?> addAccount(@RequestBody TAIKHOAN tk){
		accountService.addAccount(tk);
		return new ResponseEntity<String>("Account added!",HttpStatus.OK);
	}
	
	
	@DeleteMapping("/delete/{user}")
	public ResponseEntity<?> deleteAcc(@PathVariable("user")String name){
		if(accountService.delete(name)) {
			return  new ResponseEntity<String>("Account deleted!",HttpStatus.OK);
		}else return  new ResponseEntity<String>("Not found!",HttpStatus.NOT_FOUND);
	}
}
