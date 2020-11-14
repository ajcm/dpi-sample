package com.project.backend;

import com.project.backend.bigdata.DeviceDpiProcessor;
import com.project.backend.bigdata.domain.DeviceDpi;
import com.project.backend.bigdata.domain.Sample;
import com.project.backend.bigdata.repository.DeviceDpiRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/devices")
@Slf4j
public class DevicesController {

    @Autowired
    DeviceDpiRepository  deviceDpiRepository;

    @Autowired
    DeviceDpiProcessor deviceDpiProcessor;

    @GetMapping(path = "/dpi")
    Page<DeviceDpi> findAllPage(
            @PageableDefault(page = 0, size = 20)
                    Pageable pageable) {
        return deviceDpiRepository.findAllPage(pageable);
    }

    @PostMapping(path = "/dpi")
    void process() {
        deviceDpiProcessor.processDPI();
    }



}
