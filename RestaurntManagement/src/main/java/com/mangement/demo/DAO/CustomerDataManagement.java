package com.mangement.demo.DAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mangement.demo.entity.*;
@Repository
public interface CustomerDataManagement extends JpaRepository<CUSTOMER_DATA, String>{

}
