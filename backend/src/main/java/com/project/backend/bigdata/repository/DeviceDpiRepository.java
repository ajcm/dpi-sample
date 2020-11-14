package com.project.backend.bigdata.repository;

import com.project.backend.bigdata.domain.DeviceDpi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceDpiRepository extends CrudRepository<DeviceDpi, Long> {

    @Query("select c from DeviceDpi c")
    Page<DeviceDpi> findAllPage(Pageable pageable);


    

}


