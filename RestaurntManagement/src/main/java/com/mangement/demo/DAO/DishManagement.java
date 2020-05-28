package com.mangement.demo.DAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.mangement.demo.entity.*;
import java.util.*;
@Repository
public interface DishManagement extends JpaRepository<MON_AN,String>{
    @Query(value = "select * from MON_AN where loai_thucan = :category", nativeQuery = true)
    List<MON_AN> getDishByCategory(@Param("category") String name);
}
