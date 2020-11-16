package com.project.backend.bigdata.repository;

import com.project.backend.bigdata.domain.DeviceDpi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceDpiRepository extends CrudRepository<DeviceDpi, Long> {

    @Query("select c from DeviceDpi c")
    Page<DeviceDpi> findAllPage(Pageable pageable);

    @Query("select distinct(c.client) from DeviceDpi c")
    List<String> findAllClients();

    @Query("select distinct(c.office) from DeviceDpi c where c.client like client")
    List<String> findOffices(String clientId);


    

}


