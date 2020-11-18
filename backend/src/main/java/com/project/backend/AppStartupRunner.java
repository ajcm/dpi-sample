package com.project.backend;

import com.project.backend.bigdata.DeviceService;
import com.project.backend.bigdata.domain.SubmitResult;
import com.project.backend.bigdata.DataService;
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
    DataService dataService;

    @Autowired
    DeviceService deviceService;


    /**
     * Loads the cvs data and processes the DPI.
     *
     */
    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("Application started with option names : {}",
                args.getOptionNames());

        Resource entries = new ClassPathResource("device_performance_index.csv");

        log.debug("file size: " + entries.contentLength());

        try (InputStream stream = entries.getInputStream()) {
            SubmitResult result = dataService.parse(stream);
            log.debug("Loaded Data " + result + " items.");
            deviceService.processDPI();
            log.debug("Processed" + result + " items.");

        } catch (Exception ex) {
            log.info("Startup populating data", ex);
        }

    }





}