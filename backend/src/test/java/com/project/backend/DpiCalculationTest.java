package com.project.backend;

import com.project.backend.bigdata.DpiCalculator;
import com.project.backend.bigdata.domain.DeviceDpi;
import com.project.backend.bigdata.domain.Sample;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DpiCalculationTest {

    @Test
    public void testParsing() {

        Sample s1 = new Sample();
        Sample min = DpiCalculator.getSampleFromEntry("device,client,office,0,0,0,0,0,0,0");
        Sample max = DpiCalculator.getSampleFromEntry("device,client,office,1,1,1,1,1,1,1");
        System.out.println(s1);

        DeviceDpi r1= DpiCalculator.getDeviceDPI(s1,min,max);
        assertEquals(r1.getDpi(), new BigDecimal("10.00000"));


        DeviceDpi r2= DpiCalculator.getDeviceDPI(max,min,max);
        assertEquals(r2.getDpi(),new BigDecimal("0.00000"));

        Sample s3 = DpiCalculator.getSampleFromEntry("device,client,office,5,5,5,5,5,5,5");
        Sample min3 = DpiCalculator.getSampleFromEntry("device,client,office,0,0,0,0,0,0,0");
        Sample max3 = DpiCalculator.getSampleFromEntry("device,client,office,10,10,10,10,10,10,10");


        DeviceDpi r3= DpiCalculator.getDeviceDPI(s3,min3,max3);
        assertEquals(r3.getDpi(),new BigDecimal("5.00000"));

    }
}
