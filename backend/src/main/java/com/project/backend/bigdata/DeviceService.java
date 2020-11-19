package com.project.backend.bigdata;

import com.project.backend.bigdata.domain.DeviceDpi;
import com.project.backend.bigdata.domain.Sample;
import com.project.backend.bigdata.repository.DeviceDpiRepository;
import com.project.backend.bigdata.repository.SamplesRepository;
import com.project.backend.bigdata.repository.SpecificationBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import static com.project.backend.bigdata.DpiCalculator.getDeviceDPI;

@Service
@Slf4j
public class DeviceService {

    /**
     * Service that calculates and retrieves DPI data from DPI
     * */

    @Autowired
    SamplesRepository samplesRepository;

    @Autowired
    DeviceDpiRepository deviceDpiRepository;


    public long processDPI(){
       log.info("ProcessDPI");

       long samplesCount =  samplesRepository.count();

       if (samplesCount == 0 ){
           log.info("No samples to process");
           return 0;
       }

        log.info("Samples to process: " + samplesCount);

        Iterable<Sample> iterable = samplesRepository.findAll();
        Iterator<Sample> iterator = iterable.iterator();

        if (!iterator.hasNext()){
            log.info("No samples to process");
            return 0;
        }

        long count = 0;

        Sample maxValues = samplesRepository.getHistoryMaxValues("");
        Sample minValues = samplesRepository.getHistoryMinValues("");

        List<DeviceDpi> processed = new LinkedList<>();
        for (int i = 0; iterator.hasNext();i++) {
            Sample sample = iterator.next();
            DeviceDpi deviceDpi = getDeviceDPI(sample,minValues,maxValues);
            processed.add(deviceDpi);
            count ++;
        }

        log.info("saving : " + processed.size());
        deviceDpiRepository.saveAll(processed);

        return count;
    }

    /** TODO: support decimals in the range */
    public Page<DeviceDpi> find(String clientId, String officeId,String deviceId,String from, String to, Pageable pageable){
        return deviceDpiRepository.findAll(SpecificationBuilder.getSearchQuery(clientId,officeId,deviceId,from,to),pageable);
    }

    public List<String> findDevices(){
        return deviceDpiRepository.findAllDevices();
    }




}
