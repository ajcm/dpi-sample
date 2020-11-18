package com.project.backend.bigdata;

import com.project.backend.bigdata.domain.Sample;
import com.project.backend.bigdata.domain.SubmitResult;
import com.project.backend.bigdata.domain.SubmitException;
import com.project.backend.bigdata.repository.SamplesRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.ApplicationScope;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
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
@Service
@ApplicationScope
@Slf4j
public class DataService {

    public static String  SPLIT_CHAR = ",";

    @Autowired
    SamplesRepository samplesRepository;

    public SubmitResult parseMultipartFile(MultipartFile file) throws SubmitException {

        try (
                ByteArrayInputStream stream = new ByteArrayInputStream(file.getBytes());
        ) {
           return parse(stream);

        }catch(IOException ex){
            log.error("General error processing request",ex);
            throw new SubmitException(ex,-1,"General error processing request");

        }
    }



    public SubmitResult parse(InputStream stream) throws SubmitException {

        try (
                InputStreamReader streamReader = new InputStreamReader(stream, StandardCharsets.UTF_8);
                BufferedReader bufferedReader = new BufferedReader(streamReader);
        ) {
            List<Sample> entries = DataService.parse(bufferedReader, true);

            /* TODO: Improve performance like executing a Batch insert */
            samplesRepository.saveAll(entries);

            int count = entries.size();
            return new SubmitResult(count);

        }catch(IOException ex){
            log.error("General error processing request",ex);
            throw new SubmitException(ex,-1,"General error processing request");

        }
    }



    private static List<Sample> parse (BufferedReader br, boolean ignoreFirstLine) throws  SubmitException {
       List<Sample> result = new LinkedList<>();

       String line = "";
       int count  = 0 ;


       try {
           while ((line = br.readLine()) != null) {

               if (count == 0 && ignoreFirstLine) {
                   count++;
                   continue;
               }

               if (StringUtils.isBlank(line)) {
                   throw new SubmitException(count, "Line is Empty");
               }

               // use comma as separator
               String[] elements = line.split(SPLIT_CHAR);

               if (ArrayUtils.getLength(elements) != 10) {
                   throw new SubmitException(count, "Wrong number of fields ");
               }

               Sample entry = getAsSubmitEntry(elements);

               if (!entry.isValid()) {
                   throw new SubmitException(count + 1, "Invalid entry");
               }

               result.add(entry);
               count++;
           }

       }catch (IOException ex){
           throw new SubmitException(ex);
       }


       return result;
   }

    private static Sample getAsSubmitEntry(String[] elements) {


        String deviceId = StringUtils.trim(elements[0]);
        String clientId = StringUtils.trim(elements[1]);
        String officeId = StringUtils.trim(elements[2]);

        String bsdoCount =  StringUtils.trim(elements[3]);
        String hardResetCount =  StringUtils.trim(elements[4]);

        String bootSpeed =  StringUtils.trim(elements[5]);
        String logonDuration =  StringUtils.trim(elements[6]);
        String cpuUsage =  StringUtils.trim(elements[7]);
        String memoryUsage =  StringUtils.trim(elements[8]);
        String systemFreeSpace =  StringUtils.trim(elements[9]);


        Sample entry = new Sample();
        entry.setDevice(deviceId);
        entry.setClient(clientId);
        entry.setOffice(officeId);

        entry.setBsod(NumberUtils.toInt(bsdoCount,-1));
        entry.setHardReset(NumberUtils.toInt(hardResetCount,-1));

        entry.setBootSpeed(NumberUtils.toLong(bootSpeed,-1));
        entry.setLogonDuration(NumberUtils.toLong(logonDuration,-1));
        entry.setSystemFreeSpace(NumberUtils.toLong(systemFreeSpace,-1));

        entry.setCpuUsage(NumberUtils.toDouble(cpuUsage,-1));
        entry.setMemoryUsage(NumberUtils.toDouble(memoryUsage,-1));

        return entry;
    }


}
