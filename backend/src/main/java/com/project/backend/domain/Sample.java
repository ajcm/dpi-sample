package com.project.backend.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

/**
 Device_ID
 Client_ID
 Office_ID
 BSOD_count
 Hard_reset_count
 Boot_Speed
 Logon_Duration
 CPU_Usage
 Memory_Usage
 System_Free_Space
 */

@Entity
@Getter @Setter @ToString
public class Sample {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    private String device;
    private String client;
    private String office;

    private int bsod;
    private int hardReset;
    private int bootSpeed;
    private long logonDuration;
    private long cpuUsage;
    private long memoryUsage;
    private long systemFreeSpace;

}
