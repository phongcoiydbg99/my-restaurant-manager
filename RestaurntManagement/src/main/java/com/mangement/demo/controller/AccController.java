package com.mangement.demo.controller;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mangement.demo.entity.TAIKHOAN;
import com.mangement.demo.service.AccountService;
import java.util. *;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/manage")
public class AccController {
	@Autowired
     AccountService accountService;
	
	@GetMapping("/account")//liet ke danh sach tk
	public ResponseEntity<List<TAIKHOAN>> getAllAcc(){
		return new ResponseEntity<List<TAIKHOAN>>(accountService.getAllAcc(),HttpStatus.OK);
	}
	@RequestMapping(value = "/hello", method = RequestMethod.GET) 
	public ResponseEntity<String> hello(){
		return ResponseEntity.ok("Hello there");
	}
	
	@GetMapping("/account/{user}") //xem thong tin 1 tk
	public ResponseEntity<?> getAcc(@PathVariable("user") String name){
		Optional<TAIKHOAN> tk = accountService.getAccByUsername(name);
		if(tk.isPresent()) {
			return  new ResponseEntity<Optional<TAIKHOAN>>(tk,HttpStatus.OK);
		}else return new ResponseEntity<String>("Not found employee",HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/addAccount")
	public ResponseEntity<?> addAccount(@RequestBody TAIKHOAN tk){
		accountService.addAccount(tk);
		return new ResponseEntity<String>("Account added!",HttpStatus.OK);
	}
	
	@PostMapping("/salary/{user}")
	public ResponseEntity<?> changeSalary(@PathVariable("user") String username, @RequestParam long sal ){
		if(accountService.increaseSalary(sal, username)) {
			return  new ResponseEntity<String>("Salary changed!",HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("Not found!",HttpStatus.NOT_FOUND);
		}
	}
	@DeleteMapping("/account/{user}")
	public ResponseEntity<?> deleteAcc(@PathVariable("user")String name){
		if(accountService.delete(name)) {
			return  new ResponseEntity<String>("Account deleted!",HttpStatus.OK);
		}else return  new ResponseEntity<String>("Not found!",HttpStatus.NOT_FOUND);
	}
}
