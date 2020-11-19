package com.project.backend.bigdata;

import com.project.backend.bigdata.domain.DeviceDpi;
import com.project.backend.bigdata.domain.Sample;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class DpiCalculator {
    public static String  SPLIT_CHAR = ",";


    /** AUX **/
    static public DeviceDpi getDeviceDPI(Sample sample, Sample minValues, Sample maxValues) {
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

    public static Sample getSampleFromEntry(String line) {
        if (StringUtils.isBlank(line)) {
           return new Sample();
        }

        // use comma as separator
        String[] elements = line.split(SPLIT_CHAR);

        if (ArrayUtils.getLength(elements) != 10) {
            return new Sample();
        }

        return  getSample(elements);
    }

    public static Sample getSample(String[] elements) {

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
