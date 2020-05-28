package com.mangement.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mangement.demo.service.*;
import com.mangement.demo.entity.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/table")
public class TableController {
	@Autowired
    private TableService tableService;
	
	@GetMapping("/all")
    public ResponseEntity<List<BAN_AN>> getAllTable(){
    	return new ResponseEntity<List<BAN_AN>>(tableService.getAllTable(),HttpStatus.OK);
    }
    @GetMapping("/{name}")
    public ResponseEntity<?> getTableByName(@PathVariable("name") String name){
    	Optional<BAN_AN> oTable = tableService.getTable(name);
        if(oTable.isPresent()) {
        	return new ResponseEntity<BAN_AN> (oTable.get(),HttpStatus.OK);
        }else return new ResponseEntity<String>("No table found", HttpStatus.NOT_FOUND);
    }
    
    @PostMapping("/add")
	 public ResponseEntity<?>  addTable(@RequestBody BAN_AN Table){
   	     tableService.addTable(Table);
		return new ResponseEntity<String>("Table added",HttpStatus.OK);
		
	}
   
   @PutMapping("/modify/{name}")
   public ResponseEntity<?> modifyTable(@PathVariable("name") String name, @RequestBody BAN_AN Table){
   	
       if(tableService.modifyTable(Table, name)) {
       	return new ResponseEntity<String> ("Table updated",HttpStatus.OK);
       }else return new ResponseEntity<String>("No Table found", HttpStatus.NOT_FOUND);
   }
   
   @DeleteMapping("/delete/{name}")
   public ResponseEntity<?> deleteTable(@PathVariable("name") String name){
   	
       if(tableService.deleteTable( name)) {
       	return new ResponseEntity<String> ("Table deleted",HttpStatus.OK);
       }else return new ResponseEntity<String>("No Table found", HttpStatus.NOT_FOUND);
   }
}
