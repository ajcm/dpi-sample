package com.project.backend.bigdata.repository;

import com.project.backend.bigdata.Sample;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SamplesRepository extends CrudRepository<Sample, Long> {

    @Query("select c from Sample c")
    Page<Sample> findAllPage(Pageable pageable);

/*
    private int bsod;
    private int hardReset;
    private long bootSpeed;
    private long logonDuration;
    private double cpuUsage;
    private double memoryUsage;
    private long systemFreeSpace;
 */
    /* Max */
    @Query("select max(c.bsod) from Sample c")
    int maxBsod();

    @Query("select max(c.hardReset) from Sample c")
    int maxHardReset();

    @Query("select max(c.bootSpeed) from Sample c")
    long  maxBootSpeed();

    @Query("select max(c.logonDuration) from Sample c")
    long  maxLogonDuration();

    @Query("select max(c.cpuUsage) from Sample c")
    double  maxCpuUsage();

    @Query("select max(c.systemFreeSpace) from Sample c")
    long maxSystemFreeSpace();

    @Query("select max(c.memoryUsage) from Sample c")
    double  maxMemoryUsage();

    /* Min */
    @Query("select min(c.bsod) from Sample c")
    int minBsod();

    @Query("select min(c.hardReset) from Sample c")
    int minHardReset();

    @Query("select min(c.bootSpeed) from Sample c")
    long  minBootSpeed();

    @Query("select min(c.logonDuration) from Sample c")
    long  minLogonDuration();

    @Query("select min(c.cpuUsage) from Sample c")
    double  minCpuUsage();

    @Query("select min(c.systemFreeSpace) from Sample c")
    long minSystemFreeSpace();

    @Query("select min(c.memoryUsage) from Sample c")
    double  minMemoryUsage();









    

}


