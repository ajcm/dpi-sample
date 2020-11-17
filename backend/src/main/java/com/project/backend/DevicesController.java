package com.project.backend;

import com.project.backend.bigdata.DeviceDpiService;
import com.project.backend.bigdata.domain.DeviceDpi;
import com.project.backend.bigdata.repository.DeviceDpiRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.function.Predicate;

@RestController
@RequestMapping("/devices")
@Slf4j
public class DevicesController {

    @Autowired
    DeviceDpiService deviceDpiService;

    @GetMapping(path = "/dpi")
    Page<DeviceDpi> findAllPage(@PageableDefault(page = 0, size = 20)
                    Pageable pageable,
                                @RequestParam(required = false) String clientId,
                                @RequestParam(required = false) String officeId,
                                @RequestParam(required = false) String from,
                                @RequestParam(required = false) String to) {

        return deviceDpiService.find(clientId,officeId,from,to,pageable);
       // return deviceDpiRepository.findByClient(clientId,pageable);
    }

    @PostMapping(path = "/dpi")
    void process() {
        deviceDpiService.processDPI();
    }



}

