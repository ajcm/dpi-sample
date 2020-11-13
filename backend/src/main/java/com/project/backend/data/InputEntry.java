package com.project.backend.data;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

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

@Getter @Setter @ToString
public class InputEntry {

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
