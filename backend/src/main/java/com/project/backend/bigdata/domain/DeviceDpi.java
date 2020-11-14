package com.project.backend.bigdata.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;

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
@Getter
@Setter
@ToString
public class DeviceDpi {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    private String device;
    private String client;
    private String office;

    private BigDecimal bsod;
    private BigDecimal hardResets;
    private BigDecimal bootSpeed;
    private BigDecimal logonDuration;
    private BigDecimal cpuUsage;
    private BigDecimal systemFreeSpace;
    private BigDecimal memoryUsage;

    private BigDecimal dpi;

}
