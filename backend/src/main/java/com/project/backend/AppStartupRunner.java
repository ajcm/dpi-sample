package com.project.backend;

import com.project.backend.bigdata.Sample;
import com.project.backend.bigdata.SubmitResult;
import com.project.backend.bigdata.parsing.DataParserCSV;
import com.project.backend.bigdata.repository.SamplesRepository;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.InputStream;


@Component @Slf4j
public class AppStartupRunner implements ApplicationRunner {

    @Autowired
    DataParserCSV dataParserCSV;

    @Autowired
    SamplesRepository samplesRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("Application started with option names : {}",
                args.getOptionNames());

        Resource entries = new ClassPathResource("device_performance_index.csv");

        log.debug("file size: " +    entries.contentLength());

        try (InputStream stream = entries.getInputStream()){
            SubmitResult result = dataParserCSV.parse(stream);
            log.debug("Loaded Data " + result + " items." );
        }catch (Exception ex){
            log.info("Startup populating data",ex);
        }


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

        Iterable<Sample> iter = samplesRepository.findAll();

        for (int i = 0; i < 10 && iter.iterator().hasNext();i++) {

            Sample sample = iter.iterator().next();

            System.out.println("Parse " + i + " " + sample);

            int value = sample.getBsod();
            int max = maxBsod;
            int min = minBsod;

            double dpi = (value - min) / (max - min);

            System.out.println("Parse " + i + " " + sample);
            System.out.println("dpi " + dpi);
        }


    }
}