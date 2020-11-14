package com.project.backend.bigdata.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.StringUtils;

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
    private long bootSpeed;
    private long logonDuration;
    private double cpuUsage;
    private double memoryUsage;
    private long systemFreeSpace;

    public boolean isValid(){
        return
                StringUtils.isNoneBlank(device,client,office) &&
                        bsod > -1 &&
                        hardReset > -1 &&
                        bootSpeed > -1 &&
                        logonDuration > -1 &&
                        cpuUsage > -1 &&
                        memoryUsage > -1 &&
                        systemFreeSpace > -1;
    }

}
