package com.mangement.demo.DAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.mangement.demo.entity.*;

import java.util.List;

import org.springframework.data.jpa.repository.*;

@Repository
public interface DatBanManagement extends JpaRepository<DS_DATBAN, Long> {
    @Query(value = "select * from DS_DATBAN where guest_name = :guest", nativeQuery = true)
    List<DS_DATBAN> findReservedByGuest(@Param("guest") String guestName);
    
    @Query(value = "select * from DS_DATBAN where guest_number = :phone", nativeQuery = true) 
    List<DS_DATBAN> findReservedByPhone(@Param("phone") Long phone);
    
    @Modifying
    @Query(value = "delete from DS_DATBAN where guest_name= :guest", nativeQuery = true)
    void deleteReservedByTable(@Param("guest")String guest);
    
    @Modifying
    @Query(value = "delete from DS_DATBAN where guest_number = :phone", nativeQuery = true)
    void deleteReservedByPhone(@Param("phone") Long phone);
    
}