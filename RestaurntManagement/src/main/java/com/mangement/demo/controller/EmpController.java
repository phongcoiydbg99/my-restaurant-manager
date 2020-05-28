package com.mangement.demo.controller;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mangement.demo.entity.NHANVIEN;
import com.mangement.demo.service.EmpService;
import java.util. *;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/employee")
public class EmpController {
	@Autowired
    private EmpService empService;
	
	@GetMapping("/all")
	public ResponseEntity<List<NHANVIEN>> getAllEmployees() {
		return new ResponseEntity<List<NHANVIEN>>(empService.getAllEmp(),HttpStatus.OK);
	}
	
	 @GetMapping("/{name}")
	    public ResponseEntity<?> getEmpByName(@PathVariable("name") String name){
	    	List<NHANVIEN> empList = empService.getEmpByName(name);
	        if(empList.size() == 1) {
	        	return new ResponseEntity<NHANVIEN> (empList.get(0),HttpStatus.OK);
	        }else return new ResponseEntity<String>("No job found", HttpStatus.NOT_FOUND);
	    }
	 
	 @PostMapping("/add/{jobName}")//ham nay them thong tin 1 nhan vien gan voi 1 account trc do
	 public ResponseEntity<?>  addEmployee(@RequestBody NHANVIEN nv, @PathVariable("jobName") String name){
		 empService.addEmp(nv,name);
		return new ResponseEntity<String>("Employee added",HttpStatus.OK);
		
	}
	 
	@PutMapping("/modify/{name}")
	public ResponseEntity<?> updateEmpInfo(@RequestBody NHANVIEN nv, @PathVariable("name")String name){
		if(empService.modifyEmpByName(nv, name)) {
			return new ResponseEntity<String>("Info modified !", HttpStatus.OK);
		}else return new ResponseEntity<String>("Employee not found !", HttpStatus.NOT_FOUND);
	}

        @DeleteMapping("delete/{name}")
        public ResponseEntity<String> deleteEmpByName( @PathVariable("name") String name){
              if(empService.deleteEmpByName(name)){
                   return new ResponseEntity<String>("Employee deleted",HttpStatus.OK);
               }else return new ResponseEntity<String>("Employee not found !", HttpStatus.NOT_FOUND);
         }
}
