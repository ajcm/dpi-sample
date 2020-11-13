package com.project.backend.parsing;

import com.project.backend.data.SubmitEntry;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;


import java.io.BufferedReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

/**
 * Expected fields
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
public class DataParserCSV {

   public static List<SubmitEntry> parse (BufferedReader br) throws  IOException {
       List<SubmitEntry> result = new LinkedList<>();

       String line = "";
       int count  = 0 ;
       String cvsSplitBy = ",";

           while ((line = br.readLine()) != null) {

               if (StringUtils.isBlank(line)){
                   throw new IOException("Line:"+ count + " is Empty" );
               }

               // use comma as separator
               String[] elements = line.split(cvsSplitBy);

               if (ArrayUtils.getLength(elements) != 10){
                   throw new IOException("Line:"+ count + " wrong number of fields " );
               }

               SubmitEntry entry = getAsSubmitEntry(elements);

               result.add(entry);

           }




       return result;
   }

    private static SubmitEntry getAsSubmitEntry(String[] elements) {


        String deviceId = StringUtils.trim(elements[0]);
        String clientId = StringUtils.trim(elements[1]);
        String officeId = StringUtils.trim(elements[2]);
//
//        String bsdoCount = elements[0];
//        String hardResetCount = elements[0];
//
//        String bootSpeed = elements[0];
//        String logonDuration = elements[0];
//        String cpuUsage = elements[0];
//        String memoryUsage = elements[0];
//        String systemFreeSpace= elements[0];

        SubmitEntry entry = new SubmitEntry();
        entry.setDevice(deviceId);
        entry.setClient(clientId);
        entry.setOffice(officeId);

        return entry;
    }


}
