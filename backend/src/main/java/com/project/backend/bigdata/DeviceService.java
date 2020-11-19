package com.project.backend.bigdata;

import com.project.backend.bigdata.domain.DeviceDpi;
import com.project.backend.bigdata.domain.Sample;
import com.project.backend.bigdata.repository.DeviceDpiRepository;
import com.project.backend.bigdata.repository.SamplesRepository;
import com.project.backend.bigdata.repository.SpecificationBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Iterator;
import java.util.List;

@Service
public class DeviceService {
    @Autowired
    SamplesRepository samplesRepository;

    @Autowired
    DeviceDpiRepository deviceDpiRepository;


    public void processDPI(){
        //clear existing
        deviceDpiRepository.deleteAll();

        Iterable<Sample> iterable = samplesRepository.findAll();
        Iterator<Sample> iterator = iterable.iterator();

        Sample maxValues = samplesRepository.getHistoryMaxValues("");
        Sample minValues = samplesRepository.getHistoryMinValues("");

        for (int i = 0; iterator.hasNext();i++) {
            Sample sample = iterator.next();
            DeviceDpi deviceDpi = getDeviceDPI(sample,minValues,maxValues);
            deviceDpiRepository.save(deviceDpi);
        }
    }

    /** TODO: support decimals in the range */
    public Page<DeviceDpi> find(String clientId, String officeId,String deviceId,String from, String to, Pageable pageable){
        return deviceDpiRepository.findAll(SpecificationBuilder.getSearchQuery(clientId,officeId,deviceId,from,to),pageable);
    }

    public List<String> findDevices(){
        return deviceDpiRepository.findAllDevices();
    }

    /** AUX **/
    private DeviceDpi getDeviceDPI(Sample sample, Sample minValues, Sample maxValues) {
        DeviceDpi device = new DeviceDpi();

        device.setClient(sample.getClient());
        device.setOffice(sample.getOffice());
        device.setDevice(sample.getDevice());

        BigDecimal bsod = subtractOne(getNorm (sample.getBsod(), minValues.getBsod(), maxValues.getBsod()));
        BigDecimal hardReset = subtractOne(getNorm(sample.getHardReset(), minValues.getHardReset(), maxValues.getHardReset()));
        BigDecimal bootSpeed = subtractOne(getNorm (sample.getBootSpeed(), minValues.getBootSpeed(), maxValues.getBootSpeed()));
        BigDecimal logonDuration = subtractOne(getNorm (sample.getLogonDuration(), minValues.getLogonDuration(), maxValues.getLogonDuration()));
        BigDecimal cpuUsage = subtractOne(getNorm (sample.getCpuUsage(), minValues.getCpuUsage(), maxValues.getCpuUsage()));
        BigDecimal memoryUsage = subtractOne(getNorm (sample.getMemoryUsage(), minValues.getMemoryUsage(), maxValues.getMemoryUsage()));
        BigDecimal systemFreeSpace =subtractOne( getNorm (sample.getSystemFreeSpace(), minValues.getSystemFreeSpace(), maxValues.getSystemFreeSpace()));
        BigDecimal total = bsod.add(hardReset).add(bootSpeed).add(logonDuration).add(cpuUsage).add(memoryUsage).add(systemFreeSpace);
        BigDecimal dpi = (total.multiply(BigDecimal.TEN)).divide(BigDecimal.valueOf(7),5, RoundingMode.HALF_UP);

        device.setDpi(dpi);
        device.setBsod(bsod);
        device.setHardResets(hardReset);
        device.setBootSpeed(bootSpeed);
        device.setLogonDuration(logonDuration);
        device.setCpuUsage(cpuUsage);
        device.setMemoryUsage(memoryUsage);
        device.setSystemFreeSpace(systemFreeSpace);

        return device;
    }

    private static BigDecimal subtractOne (BigDecimal d){
        return BigDecimal.ONE.subtract(d);
    }

    private static BigDecimal getNorm (double value,double min, double max){

        if (min == max){
            return BigDecimal.ZERO;
        }

        BigDecimal a = BigDecimal.valueOf(value).subtract(BigDecimal.valueOf(min));
        BigDecimal b = BigDecimal.valueOf(max).subtract(BigDecimal.valueOf(min));

        BigDecimal norm = a.divide(b,5, RoundingMode.HALF_UP);

        norm = (norm.compareTo(BigDecimal.ZERO) < 0) ? BigDecimal.ZERO :  norm;
        norm = (norm.compareTo(BigDecimal.ONE) > 0) ? BigDecimal.ONE :  norm;

        return norm;
    }

}
