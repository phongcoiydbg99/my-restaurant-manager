package com.mangement.demo.DAO;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.mangement.demo.entity.*;
import java.util.*;
@Repository
public interface Table_Dish_Management extends JpaRepository<BANAN_MONAN, Table_Dish_ID>{
	@Query(value = "select * from BANAN_MONAN where ten_ban = :tableName", nativeQuery = true)
    List<BANAN_MONAN> findTableByTableName(@Param("tableName") String tableName);
    
    @Modifying
    @Query(value = "delete from BANAN_MONAN where ten_ban = :tableName", nativeQuery = true)
    void deleteTableByTableName(@Param("tableName") String tableName);
}
