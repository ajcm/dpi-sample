package com.project.backend;

import com.project.backend.bigdata.DeviceDpiService;
import com.project.backend.bigdata.SubmitResult;
import com.project.backend.bigdata.parsing.DataParserCSV;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.InputStream;


@Component @Slf4j
public class AppStartupRunner implements ApplicationRunner {

    @Autowired
    DataParserCSV dataParserCSV;

    @Autowired
    DeviceDpiService deviceDpiService;



    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("Application started with option names : {}",
                args.getOptionNames());

        Resource entries = new ClassPathResource("device_performance_index.csv");

        log.debug("file size: " + entries.contentLength());

        try (InputStream stream = entries.getInputStream()) {
            SubmitResult result = dataParserCSV.parse(stream);
            log.debug("Loaded Data " + result + " items.");
            deviceDpiService.processDPI();
            log.debug("Processed" + result + " items.");

        } catch (Exception ex) {
            log.info("Startup populating data", ex);
        }


    }

    public void test(){
/*



        int maxBsod = samplesRepository.maxBsod();
        int maxHardResets = samplesRepository.maxHardReset();
        long maxBootSpeed = samplesRepository.maxBootSpeed();
        long maxLogonDuration = samplesRepository.maxLogonDuration();
        double maxCpuUsage = samplesRepository.maxCpuUsage();
        double maxMemoryUsage = samplesRepository.maxMemoryUsage();
        long maxSystemFreeSpace = samplesRepository.maxSystemFreeSpace();

        int minBsod = samplesRepository.minBsod();
        int minHardResets = samplesRepository.minHardReset();
        long minBootSpeed = samplesRepository.minBootSpeed();
        long minLogonDuration = samplesRepository.minLogonDuration();
        double minCpuUsage = samplesRepository.minCpuUsage();
        double minMemoryUsage = samplesRepository.minMemoryUsage();
        long minSystemFreeSpace = samplesRepository.minSystemFreeSpace();

        System.out.println("bsod:" + minBsod + " - " + maxBsod);
        System.out.println("hardResets:" + minHardResets + " - " + maxHardResets);
        System.out.println("bootSpeed:" + minBootSpeed + " - " + maxBootSpeed);
        System.out.println("logonDuration:" + minLogonDuration + " - " + maxLogonDuration);
        System.out.println("cpuUsage:" + minCpuUsage + " - " + maxCpuUsage);
        System.out.println("memoryUsage:" + minMemoryUsage + " - " + maxMemoryUsage);
        System.out.println("systemFreeSpace:" + minSystemFreeSpace + " - " + maxSystemFreeSpace);

        Iterable<Sample> iterable = samplesRepository.findAll();
        Iterator<Sample> iterator = iterable.iterator();

        for (int i = 0;iterator.hasNext();i++) {

            Sample sample = iterator.next();

            int value = sample.getBsod();
            int max = maxBsod;
            int min = minBsod;

            double dpi = (value - min) / (max - min);

            System.out.println("Parse " + i + " " + sample);
            System.out.println("dpi " + dpi);

            DeviceDpi device = new DeviceDpi();

            device.setClient(sample.getClient());
            device.setOffice(sample.getOffice());
            device.setDevice(sample.getDevice());

            device.setBsod(BigDecimal.valueOf(dpi));
            device.setDpi(BigDecimal.valueOf(dpi));

            deviceDpiRepository.save(device);
        }

*/
    }







}