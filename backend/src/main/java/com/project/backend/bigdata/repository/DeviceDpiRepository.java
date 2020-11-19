package com.project.backend.bigdata.repository;

import com.project.backend.bigdata.domain.DeviceDpi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceDpiRepository extends JpaRepository<DeviceDpi, Long>, JpaSpecificationExecutor<DeviceDpi> {

    Page<DeviceDpi> findByClient(String client,Pageable pageable);

    @Query("select distinct(c.client) from DeviceDpi c")
    List<String> findAllClients();

    @Query("select distinct(c.office) from DeviceDpi c where c.client like ?1")
    List<String> findOffices(String client);

    @Query("select distinct(c.device) from DeviceDpi c")
    List<String> findAllDevices();


}


